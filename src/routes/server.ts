import express from "express";
import loggerMiddleware from "../middlewares/logger-middleware.js";
import type { Request, Response, NextFunction } from "express";
import { createAuthRouter } from "./auth/router.js";
import { createUserRouter } from "./user/router.js";

const app = express();

app.use(express.json());
app.use(loggerMiddleware);

app.use("/api/auth", createAuthRouter());
app.use("/api/user", createUserRouter());

app.get("/test", (req: Request, res: Response, next: NextFunction) => {
  res.statusCode = 200;
  res.json("OK");
  return next();
});

export default app;
