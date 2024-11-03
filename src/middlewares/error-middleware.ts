// import { Request, Response, NextFunction } from "express";

// interface Error {
//   message?: string;
//   statusCode?: number;
// }

// export const errorMiddleware = (
//   error: Error,
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   error.message = error?.message ? error.message : "Internal Server Error";
//   error.statusCode = error instanceof ErrorResponse ? error.statusCode : 500;
//   console.log(error);

//   return res.status(error.statusCode).json({
//     success: false,
//     message: error.message,
//   });
// };
