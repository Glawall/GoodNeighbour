"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkValidInput = void 0;
const AppError_1 = require("../errors/AppError");
const errors_1 = require("../errors/errors");
const checkValidInput = (id, resultType) => __awaiter(void 0, void 0, void 0, function* () {
    if (isNaN(id)) {
        switch (resultType) {
            case "USER":
                throw new AppError_1.AppError(errors_1.errors.USER_VALIDATION_ERROR);
            case "HELP_OFFER":
                throw new AppError_1.AppError(errors_1.errors.HELP_OFFER_VALIDATION_ERROR);
            case "HELP_REQUEST":
                throw new AppError_1.AppError(errors_1.errors.HELP_REQUEST_VALIDATION_ERROR);
            case "COMMENT":
                throw new AppError_1.AppError(errors_1.errors.COMMENT_VALIDATION_ERROR);
            default:
                throw new AppError_1.AppError(errors_1.errors.VALIDATION_ERROR);
        }
    }
});
exports.checkValidInput = checkValidInput;
