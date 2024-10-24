"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// getHttpError.ts
const errors_1 = require("./errors"); // Ensure the path is correct
const getHttpError = (appError) => {
    const savedErrorObj = appError.getErrorObj();
    const isInErrorsCollection = Object.keys(errors_1.errors).find((key) => {
        return (errors_1.errors[key].statusCode === savedErrorObj.statusCode &&
            errors_1.errors[key].message === savedErrorObj.message);
    });
    if (!isInErrorsCollection) {
        throw new Error("Unexpected error! Can't find HTTP error in the 'errors' mapping collection");
    }
    return {
        statusCode: savedErrorObj.statusCode,
        message: savedErrorObj.message,
    };
};
exports.default = getHttpError;
