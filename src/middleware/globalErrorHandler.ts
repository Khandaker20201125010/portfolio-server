import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import AppError from "../errorhelpers/AppError";
import { TErrorSources } from "../errorhelpers/error.types";
import { handlerDuplicateError } from "../errorhelpers/handlerDuplicateError";
import { handlerZodError } from "../errorhelpers/handlerZodError";

dotenv.config();

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (process.env.NODE_ENV === "development") {
    console.error(err);
  }

  let errorSources: TErrorSources[] = [];
  let statusCode = 500;
  let message = "Something Went Wrong!!";

  // Duplicate error
  if (err.code === 11000) {
    const simplifiedError = handlerDuplicateError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
  }
  // Zod validation error
  else if (err instanceof ZodError) {
    const simplifiedError = handlerZodError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources as TErrorSources[];
  }
  // Custom AppError
  else if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  }
  // General error
  else if (err instanceof Error) {
    statusCode = 500;
    message = err.message;
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    err: process.env.NODE_ENV === "development" ? err : null,
    stack: process.env.NODE_ENV === "development" ? err.stack : null,
  });
};
