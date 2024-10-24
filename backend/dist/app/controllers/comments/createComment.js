"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.createComment = void 0;
const commentsService = __importStar(require("../../services/comments"));
const AppError_1 = require("../../errors/AppError");
const errors_1 = require("../../errors/errors");
const checkValidation_1 = require("../../utils/checkValidation");
const createComment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authUserId = Number(req.header("X-User-ID"));
        const helpRequestId = Number(req.params.help_request_id);
        const { description } = req.body;
        const parentId = req.params.parent_id ? Number(req.params.parent_id) : null;
        if (!authUserId) {
            throw new AppError_1.AppError(errors_1.errors.AUTHORISATION_ERROR);
        }
        yield (0, checkValidation_1.checkValidInput)(authUserId, "USER");
        yield (0, checkValidation_1.checkValidInput)(helpRequestId, "HELP_REQUEST");
        if (Number.isNaN(parentId)) {
            throw new AppError_1.AppError(errors_1.errors.VALIDATION_ERROR);
        }
        if (!description) {
            throw new AppError_1.AppError(errors_1.errors.MANDATORY_FIELD_ERROR);
        }
        const newComment = {
            author_id: authUserId,
            help_request_id: helpRequestId,
            parent_id: parentId,
            description,
        };
        const newCommentBody = yield commentsService.createComment(newComment);
        res.status(201).send({ newCommentBody });
    }
    catch (error) {
        next(error);
    }
});
exports.createComment = createComment;
