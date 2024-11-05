import express from "express";
import type { Request, Response } from "express";
import loggerMiddleware from "@/middlewares/logger-middleware.js";
import { corsMiddleware } from "@/middlewares/cors-middleware.js";
import { createAuthRouter } from "./auth/router.js";
import { createUserRouter } from "./user/router.js";
import { errorMiddleware } from "@/middlewares/error-middleware.js";
import { notFoundMiddleware } from "@/middlewares/notfound-middleware.js";
import cookieParser from "cookie-parser";
import { createPublicRouter } from "./public/router.js";
const app = express();

app.use(cookieParser());
app.use(express.json({}));
app.use(express.urlencoded({ extended: true }));
app.use(loggerMiddleware);
app.use(corsMiddleware);

app.use("/api/auth", createAuthRouter());
app.use("/api/user", createUserRouter());
app.use("/files", createPublicRouter());

app.get("/test", (req: Request, res: Response) => {
  res.statusCode = 200;
  res.json("OK");
  return;
});
app.use("*", notFoundMiddleware);
app.use(errorMiddleware);

export default app;
