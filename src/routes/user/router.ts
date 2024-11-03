import { AuthMiddlewares } from "@/middlewares/auth-middleware.js";
import { Router } from "express";

export function createUserRouter() {
  const router = Router();

  router.get("/", AuthMiddlewares.validateAccessToken, (req, res) => {
    res.json({
      success: true,
      message: "Hello from user!",
    });
  });
  return router;
}
