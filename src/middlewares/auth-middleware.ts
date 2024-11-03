import { TokenModule } from "@/lib/token-module.js";
import type { Request, Response, NextFunction } from "express";
export class AuthMiddlewares {
  static validateAccessToken(req: Request, res: Response, next: NextFunction) {
    try {
      const accessToken = req.headers["authorization"]?.split(" ")[1];
      if (!accessToken) {
        res.status(401).json({ message: "access token missing" });
        return;
      }

      const payload = TokenModule.verifyAccessToken(accessToken);
      if (!payload) {
        res.status(401).json({ message: "invalid access token" });
        return;
      }
      req.user = {
        id: payload.userID,
      };
      return next();
    } catch (error) {
      next(error);
    }
  }
}
