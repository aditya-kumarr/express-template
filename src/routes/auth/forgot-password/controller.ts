import type { Request, Response, NextFunction } from "express";
import { bodyValidator } from "@/lib/validation-module.js";
import {
  forgotPasswordChangeValidation,
  forgotPasswordRequestValidation,
  forgotPasswordVerificationValidation,
} from "./validator.js";
import { Infer } from "@vinejs/vine/types";
import { OTPModule } from "@/lib/otp-module.js";
import { HashingModule } from "@/lib/hashing-module.js";
import db from "@/db/db.js";
import { usersTable } from "@/db/schema.js";
import { eq } from "drizzle-orm";

export class ForgotPasswordController {
  @bodyValidator(forgotPasswordRequestValidation)
  static async forgotPasswordRequest(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      // take email
      const payload = req.body as Infer<typeof forgotPasswordRequestValidation>;

      // check if user exists
      const foundUser = await db.query.usersTable.findFirst({
        where: (data, { eq }) => eq(data.email, payload.email),
      });
      if (!foundUser) {
        res.status(404).json({ message: "user not found" });
        return;
      }
      // send a mail with otp
      await OTPModule.sendMailOTP({
        email: payload.email,
      });
      // send a 202
      res.status(202).json({ message: "proceed with otp" });
      return;
    } catch (error) {
      next(error);
    }
  }
  @bodyValidator(forgotPasswordVerificationValidation)
  static async forgotPasswordVerify(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      // take email and code
      const payload = req.body as Infer<
        typeof forgotPasswordVerificationValidation
      >;

      // check if user exists
      const foundUser = await db.query.usersTable.findFirst({
        where: (data, { eq }) => eq(data.email, payload.email),
      });
      if (!foundUser) {
        res.status(404).json({ message: "user not found" });
        return;
      }
      // verify the code
      const verified = await OTPModule.verifyMailOTP(
        payload.email,
        payload.otp,
        false,
      );
      if (!verified) {
        res.status(404).json({ message: "OTP did not match" });
        return;
      }
      // send a 202
      res.status(202).json({ message: "enter your new password" });
      return;
    } catch (error) {
      next(error);
    }
  }
  @bodyValidator(forgotPasswordChangeValidation)
  static async forgotPasswordChange(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      // take email and password
      const payload = req.body as Infer<typeof forgotPasswordChangeValidation>;
      // check if user exists
      const foundUser = await db.query.usersTable.findFirst({
        where: (data, { eq }) => eq(data.email, payload.email),
      });
      if (!foundUser) {
        res.status(404).json({ message: "user not found" });
        return;
      }
      // check if the otp is validated
      const verified = await OTPModule.checkOTPStatus(payload.email);
      if (!verified) {
        res.status(404).json({ message: "OTP not validated" });
        return;
      }
      // set the password to new password
      if (foundUser.password) {
        const oldPassword = await HashingModule.compare(
          payload.password,
          foundUser.password,
        );
        if (oldPassword) {
          res
            .status(404)
            .json({ message: "You've already used this password before." });
          return;
        }
      }
      const password = await HashingModule.hash(payload.password);
      await db
        .update(usersTable)
        .set({ password })
        .where(eq(usersTable.id, foundUser.id));
      await OTPModule.deleteOTP(payload.email);
      res.json({ message: "password updated" });
      return;
    } catch (error) {
      next(error);
    }
  }
}
