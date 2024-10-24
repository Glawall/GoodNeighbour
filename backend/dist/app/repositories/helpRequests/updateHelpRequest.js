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
exports.updateHelpRequest = void 0;
const connection_1 = __importDefault(require("../../connection"));
const preloadHelpTypes_1 = require("../../utils/preloadHelpTypes");
const AppError_1 = require("../../errors/AppError");
const errors_1 = require("../../errors/errors");
const updateHelpRequest = (authUserId, helpRequestId, helpRequestBody) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, help_type, req_date, status } = helpRequestBody;
    const values = [];
    const updates = [];
    const help_type_id = (0, preloadHelpTypes_1.getHelpTypeId)(help_type);
    if (title) {
        updates.push(`title =$${values.push(title)}`);
    }
    if (help_type_id) {
        updates.push(`help_type_id =$${values.push(help_type_id)}`);
    }
    if (description) {
        updates.push(`description =$${values.push(description)}`);
    }
    if (authUserId) {
        updates.push(`author_id =$${values.push(authUserId)}`);
    }
    if (req_date) {
        updates.push(`req_date =$${values.push(req_date)}`);
    }
    if (status) {
        updates.push(`status =$${values.push(status)}`);
    }
    if (updates.length === 0) {
        throw new AppError_1.AppError(errors_1.errors.MANDATORY_FIELD_ERROR);
    }
    const query = `
        UPDATE
            help_requests SET ${updates}
        WHERE
            id = ${helpRequestId}
        RETURNING
            id,
            title,
            author_id,
            help_type_id,
            description,
            req_date,
            status,
            created_at`;
    const { rows } = yield connection_1.default.query(query, values);
    return rows[0];
});
exports.updateHelpRequest = updateHelpRequest;
