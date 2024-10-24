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
exports.createHelpRequest = void 0;
const helpRequestsService = __importStar(require("../../services/helpRequests/createHelpRequest"));
const AppError_1 = require("../../errors/AppError");
const errors_1 = require("../../errors/errors");
const checkExists_1 = require("../../utils/checkExists");
const checkValidation_1 = require("../../utils/checkValidation");
const createHelpRequest = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authUserId = Number(req.header("X-User-ID"));
        yield (0, checkValidation_1.checkValidInput)(authUserId, "USER");
        yield (0, checkExists_1.userExists)(authUserId);
        if (!authUserId) {
            throw new AppError_1.AppError(errors_1.errors.AUTHORISATION_ERROR);
        }
        const helpRequestBody = req.body;
        const newHelpRequest = yield helpRequestsService.createHelpRequest(authUserId, helpRequestBody);
        res.status(201).send({ newHelpRequest });
    }
    catch (error) {
        next(error);
    }
});
exports.createHelpRequest = createHelpRequest;
