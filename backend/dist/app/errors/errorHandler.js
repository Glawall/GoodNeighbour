"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = require("./AppError");
const getHttpError_1 = __importDefault(require("./getHttpError"));
const errorHandler = (appErr, req, res, next) => {
    if (appErr instanceof AppError_1.AppError) {
        const httpError = (0, getHttpError_1.default)(appErr);
        res
            .status(httpError.statusCode)
            .send({ error: { message: httpError.message } });
    }
    else if (appErr instanceof Error) {
        const pgError = appErr;
        if (pgError.code === "23503") {
            res.status(400).send({
                error: {
                    message: "User was not found",
                },
            });
        }
        else {
            console.error("CRITICAL ERROR:", pgError);
            res
                .status(500)
                .send({ error: { code: 500, msg: "An unexpected error occurred." } });
        }
    }
    else {
        console.error("CRITICAL ERROR:", appErr);
        res
            .status(500)
            .send({ error: { code: 500, msg: "An unexpected error occurred." } });
    }
};
exports.default = errorHandler;
