import type { Request, Response, NextFunction } from "express";
export function notFoundMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.status(404);
  const error = new Error(
    `Route doesn't exist for ${req.method}: ${req.originalUrl}`
  );
  next(error);
}
