import { Router } from "express";

export function createAuthRouter() {
  const router = Router();
  router.get("/token", (req, res) => {});
  return router;
}
