"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuthorization = void 0;
const AppError_1 = require("../errors/AppError");
const errors_1 = require("../errors/errors");
const checkAuthorization = (result, author_id, resultType) => {
    if (result.author_id !== author_id) {
        switch (resultType) {
            case "COMMENT_UPDATE":
                throw new AppError_1.AppError(errors_1.errors.COMMENT_UPDATE_AUTHORISATION_ERROR);
            case "HELP_OFFER_UPDATE":
                throw new AppError_1.AppError(errors_1.errors.HELP_OFFER_UPDATE_AUTHORISATION_ERROR);
            case "HELP_REQUEST_UPDATE":
                throw new AppError_1.AppError(errors_1.errors.HELP_REQUEST_UPDATE_AUTHORISATION_ERROR);
            case "COMMENT_DELETE":
                throw new AppError_1.AppError(errors_1.errors.COMMENT_DELETE_AUTHORISATION_ERROR);
            case "HELP_OFFER_DELETE":
                throw new AppError_1.AppError(errors_1.errors.HELP_OFFER_DELETE_AUTHORISATION_ERROR);
            case "HELP_REQUEST_DELETE":
                throw new AppError_1.AppError(errors_1.errors.HELP_REQUEST_DELETE_AUTHORISATION_ERROR);
            default:
                throw new AppError_1.AppError(errors_1.errors.AUTHORISATION_ERROR);
        }
    }
};
exports.checkAuthorization = checkAuthorization;
