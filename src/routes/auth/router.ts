import { TokenModule } from "@/lib/token-module.js";
import { AuthMiddlewares } from "@/middlewares/auth-middleware.js";
import { Router } from "express";

export function createAuthRouter() {
  const router = Router();
  router.get("/token", (_, res) => {
    res.json({
      token: TokenModule.signAccessToken({ userID: "1", email: "1" }),
    });
  });
  router.post("/logout");
  return router;
}
