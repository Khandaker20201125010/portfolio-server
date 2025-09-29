"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const zod_1 = require("zod");
const AppError_1 = __importDefault(require("../errorhelpers/AppError"));
const handlerDuplicateError_1 = require("../errorhelpers/handlerDuplicateError");
const handlerZodError_1 = require("../errorhelpers/handlerZodError");
dotenv_1.default.config();
const globalErrorHandler = (err, req, res, next) => {
    if (process.env.NODE_ENV === "development") {
        console.error(err);
    }
    let errorSources = [];
    let statusCode = 500;
    let message = "Something Went Wrong!!";
    // Duplicate error
    if (err.code === 11000) {
        const simplifiedError = (0, handlerDuplicateError_1.handlerDuplicateError)(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
    }
    // Zod validation error
    else if (err instanceof zod_1.ZodError) {
        const simplifiedError = (0, handlerZodError_1.handlerZodError)(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSources;
    }
    // Custom AppError
    else if (err instanceof AppError_1.default) {
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
exports.globalErrorHandler = globalErrorHandler;
