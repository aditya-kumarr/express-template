import { Router } from "express";
import { AuthController } from "./controller.js";
import { createForgotPasswordRouter } from "./forgot-password/router.js";

export function createAuthRouter() {
  const router = Router();
  router.post("/signup", AuthController.signup);
  router.post("/login", AuthController.login);
  router.get("/token", AuthController.refetchAccessToken);
  router.post("/logout", AuthController.logout);
  router.use("/forgot-password", createForgotPasswordRouter());

  return router;
}
