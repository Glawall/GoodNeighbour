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
exports.getByHelpRequestId = void 0;
const connection_1 = __importDefault(require("../../connection"));
const getByHelpRequestId = (helpRequestId) => __awaiter(void 0, void 0, void 0, function* () {
    const { rows } = yield connection_1.default.query(`SELECT
            users.id AS user_id,
            users.first_name,
            users.address,
            users.email,
            users.phone_number,
            help_requests.id AS help_request_id,
            help_offers.status
        FROM
            users
        LEFT JOIN
            help_offers
        ON
            help_offers.helper_id = users.id
        LEFT JOIN
            help_requests
        ON
            help_requests.id = help_offers.help_request_id
        WHERE
            help_requests.id = $1`, [helpRequestId]);
    return rows;
});
exports.getByHelpRequestId = getByHelpRequestId;
