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
exports.updateComment = void 0;
const connection_1 = __importDefault(require("../../connection"));
const updateComment = (commentId, commentBody) => __awaiter(void 0, void 0, void 0, function* () {
    const query = "UPDATE comments SET description = $1 WHERE id=$2 RETURNING *";
    const values = [commentBody, commentId];
    const { rows } = yield connection_1.default.query(query, values);
    return rows[0];
});
exports.updateComment = updateComment;
