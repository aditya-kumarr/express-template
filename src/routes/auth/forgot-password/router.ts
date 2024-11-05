import { Router } from "express";
import { ForgotPasswordController } from "./controller.js";

export function createForgotPasswordRouter() {
  const router = Router();
  router.post("/request", ForgotPasswordController.forgotPasswordRequest);
  router.post("/verify", ForgotPasswordController.forgotPasswordVerify);
  router.post("/change", ForgotPasswordController.forgotPasswordChange);
  return router;
}
