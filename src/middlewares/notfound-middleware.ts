import { ErrorResponse } from "@/lib/error-handlers-module/index.js";
import type { Request, Response, NextFunction } from "express";
export function notFoundMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  next(
    new ErrorResponse(
      `${req.method} Method doesn't exist for Route: ${req.originalUrl}`,
      404,
    ),
  );
  return;
}
