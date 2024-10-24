"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
class AppError extends Error {
    constructor(errorObj) {
        super(errorObj.message);
        this.statusCode = errorObj.statusCode;
    }
    getErrorObj() {
        return { statusCode: this.statusCode, message: this.message };
    }
}
exports.AppError = AppError;
