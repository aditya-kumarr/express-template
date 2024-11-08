import { bodyValidator } from "@/lib/validation-module.js";
import type { Infer } from "@vinejs/vine/types";
import type { Request, Response, NextFunction } from "express";
import {
  validateLogin,
  validateSignup,
  validateSignupVerify,
} from "./validator.js";
import db from "@/db/db.js";
import { HashingModule } from "@/lib/hashing-module.js";
import { usersTable } from "@/db/schema.js";
import { TokenModule } from "@/lib/token-module.js";
import { and, eq } from "drizzle-orm";
import { constants, getCookieOptions } from "@/lib/cookie-module.js";
import { OTPModule } from "@/lib/otp-module.js";

export class AuthController {
  @bodyValidator(validateSignup)
  static async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const payload = req.body as Infer<typeof validateSignup>;

      const existingUser = await db.query.usersTable.findFirst({
        where: (data, { eq }) => eq(data.email, payload.email),
      });
      if (existingUser && existingUser.verified === 1) {
        res.status(422).json({ message: "User already exists" });
        return;
      } else if (existingUser && existingUser.verified === 0) {
        await db.delete(usersTable).where(eq(usersTable.email, payload.email));
      }

      const hash = await HashingModule.hash(payload.password);
      await db
        .insert(usersTable)
        .values([{ email: payload.email, password: hash }])
        .returning({ id: usersTable.id, email: usersTable.email });

      await OTPModule.sendMailOTP({ email: payload.email });
      res.status(202).json({ message: "proceed with otp" });
      return;
    } catch (error) {
      next(error);
    }
  }

  @bodyValidator(validateSignupVerify)
  static async verifySignup(req: Request, res: Response, next: NextFunction) {
    try {
      const payload = req.body as Infer<typeof validateSignupVerify>;

      const verified = await OTPModule.verifyMailOTP(
        payload.email,
        payload.otp,
      );
      if (!verified) {
        res.status(401).json({ message: "invalid otp" });
        return;
      }

      const user = await db.query.usersTable.findFirst({
        where: (data, { eq }) => eq(data.email, payload.email),
        columns: {
          id: true,
          verified: true,
          email: true,
        },
      });

      if (!user) {
        res.status(409).json({ message: "user not found" });
        return;
      }
      if (user.verified === 1) {
        res.status(409).json({ message: "user already verified" });
        return;
      }

      const refreshToken = TokenModule.signRefreshToken({
        email: payload.email,
        userID: user.id.toString(),
      });

      const accessToken = TokenModule.signAccessToken({
        email: payload.email,
        userID: user.id.toString(),
      });

      await db
        .update(usersTable)
        .set({ refreshToken })
        .where(eq(usersTable.id, user.id));

      res.cookie(...getCookieOptions(refreshToken));
      res.json({
        accessToken,
        user: user,
      });
      return;
    } catch (error) {
      next(error);
    }
  }

  @bodyValidator(validateLogin)
  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const payload = req.body as Infer<typeof validateLogin>;

      const user = await db
        .select({ id: usersTable.id, password: usersTable.password })
        .from(usersTable)
        .where(
          and(eq(usersTable.email, payload.email), eq(usersTable.verified, 1)),
        );

      if (user.length === 0) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      if (!user[0].password) {
        res.status(403).json({ message: "User has no password" });
        return;
      }
      const match = await HashingModule.compare(
        payload.password,
        user[0].password,
      );

      if (!match) {
        res.status(403).json({ message: "Invalid password" });
        return;
      }

      const refreshToken = TokenModule.signRefreshToken({
        email: payload.email,
        userID: user[0].id.toString(),
      });

      const accessToken = TokenModule.signAccessToken({
        email: payload.email,
        userID: user[0].id.toString(),
      });

      await db
        .update(usersTable)
        .set({ refreshToken })
        .where(eq(usersTable.id, user[0].id));

      res.cookie(...getCookieOptions(refreshToken));

      res.json({
        message: "success",
        data: {
          accessToken,
          user: user[0],
        },
      });
    } catch (error) {
      next(error);
    }
  }

  static async refetchAccessToken(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const refreshToken = req.cookies[constants.refreshToken.cookie];
      if (!refreshToken) {
        res.status(401).json({ message: "Missing refresh token" });
        return;
      }
      const payload = TokenModule.verifyRefreshToken(refreshToken);
      if (!payload) {
        res.status(401).json({ message: "Invalid refresh token" });
        return;
      }

      const user = await db
        .select({ id: usersTable.id, email: usersTable.email })
        .from(usersTable)
        .where(
          and(
            eq(usersTable.id, parseInt(payload.userID)),
            eq(usersTable.refreshToken, refreshToken),
          ),
        );

      if (user.length === 0) {
        res.status(401).json({ message: "Discarded refresh token" });
        return;
      }
      const accessToken = TokenModule.signAccessToken({
        email: payload.email,
        userID: payload.userID,
      });
      res.json({ accessToken, user: user });
      return;
    } catch (error) {
      next(error);
    }
  }

  static async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const refreshToken = req.cookies[constants.refreshToken.cookie];
      if (!refreshToken) {
        res.sendStatus(401);
        return;
      }
      const payload = TokenModule.verifyRefreshToken(refreshToken);
      if (!payload) {
        res.status(401).json({ message: "invalid refresh token" });
        return;
      }

      await db
        .update(usersTable)
        .set({ refreshToken: null })
        .where(
          and(
            eq(usersTable.id, parseInt(payload.userID)),
            eq(usersTable.refreshToken, refreshToken),
          ),
        );

      res.clearCookie(constants.refreshToken.cookie, {
        domain: constants.refreshToken.cookieDomain,
      });
      res.json({ message: "Logged out" });
      return;
    } catch (error) {
      res.clearCookie(constants.refreshToken.cookie, {
        domain: constants.refreshToken.cookieDomain,
      });
      next(error);
    }
  }
}
