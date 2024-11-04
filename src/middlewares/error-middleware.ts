import { ErrorResponse } from "@/lib/error-handlers-module/index.js";
import logger from "@/lib/logger-module.js";
import type { Request, Response } from "express";

interface Error {
  message?: string;
  statusCode?: number;
}

export const errorMiddleware = (error: Error, req: Request, res: Response) => {
  error.message = error?.message ? error.message : "Internal Server Error";
  error.statusCode = error instanceof ErrorResponse ? error.statusCode : 500;
  if (process.env.NODE_ENV === "dev") {
    logger.error(error.message);
  }

  res.status(error.statusCode).json({
    success: false,
    message: error.message,
  });
  return;
};
