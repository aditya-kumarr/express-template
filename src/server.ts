import express from "express";
import loggerMiddleware from "./middlewares/logger-middleware.js";
import type { Request, Response, NextFunction } from "express";

const app = express();

app.use(express.json());
app.use(loggerMiddleware);
app.get("/test", (req: Request, res: Response, next: NextFunction) => {
  res.statusCode = 200;
  res.json("Hello World!");
  return next();
});

export default app;
