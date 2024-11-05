import { TokenModule } from "@/lib/token-module.js";
import { Router } from "express";

export function createAuthRouter() {
  const router = Router();

  router.get("/");

  router.get("/token", (_, res) => {
    const token = TokenModule.signAccessToken({ userID: "1", email: "1" });

    res.json({
      token,
    });
  });
  router.post("/logout");
  return router;
}
