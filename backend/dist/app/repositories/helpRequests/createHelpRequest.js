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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHelpRequest = void 0;
const connection_1 = __importDefault(require("../../connection"));
const AppError_1 = require("../../errors/AppError");
const errors_1 = require("../../errors/errors");
const preloadHelpTypes_1 = require("../../utils/preloadHelpTypes");
const createHelpRequest = (authorId, helpRequestBody) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, help_type, description, req_date } = helpRequestBody;
    const helpTypeId = (0, preloadHelpTypes_1.getHelpTypeId)(help_type);
    if (!title || !help_type || !description || !req_date) {
        throw new AppError_1.AppError(errors_1.errors.MANDATORY_FIELD_ERROR);
    }
    const query = `INSERT INTO help_requests (title, author_id, help_type_id, description, req_date) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
    const values = [title, authorId, helpTypeId, description, req_date];
    const { rows } = yield connection_1.default.query(query, values);
    return rows[0];
});
exports.createHelpRequest = createHelpRequest;
