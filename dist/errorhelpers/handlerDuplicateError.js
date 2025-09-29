"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlerDuplicateError = void 0;
const handlerDuplicateError = (err) => {
    const matchedArray = err.message.match(/"([^"]*)"/);
    return {
        statusCode: 400,
        message: `${matchedArray[1]} already exists!!`
    };
};
exports.handlerDuplicateError = handlerDuplicateError;
