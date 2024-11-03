import { AuthMiddlewares } from "@/middlewares/auth-middleware.js";
import { Router } from "express";

export function createAuthRouter() {
  const router = Router();
  router.get("/token");
  router.post("/logout");
  return router;
}
