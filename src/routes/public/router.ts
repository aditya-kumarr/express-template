import { Router, static as expressStatic } from "express";

export function createPublicRouter() {
  const router = Router();
  router.get("/*", expressStatic("storage"));
  return router;
}
