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
const getByHelpRequestId = (helpRequestIid) => __awaiter(void 0, void 0, void 0, function* () {
    const helpRequestOffers = yield connection_1.default.query(`SELECT
            users.id AS user_id,
            users.first_name,
            users.last_name,
            users.address,
            users.postcode,
            users.phone_number,
            users.additional_contacts,
            help_offers.status,
            help_offers.helper_id,
            help_offers.help_request_id

        FROM
            help_offers
        JOIN
            users
        ON
            help_offers.helper_id = users.id
        WHERE 
            help_offers.help_request_id = $1`, [helpRequestIid]);
    const helpRequestOffersRows = helpRequestOffers.rows;
    const helpRequest = yield connection_1.default.query(`SELECT
        users.id,
        users.first_name,
        users.last_name,
        users.postcode,

        users.address,
        users.phone_number,
        users.additional_contacts,

        help_requests.author_id,
        help_requests.id AS help_request_id,
        help_requests.title,
        help_requests.description,
        help_requests.created_at,
        help_requests.req_date,
        help_requests.status,
        help_requests.help_type_id,
        help_types.name AS help_type_name

        FROM
            help_requests
        JOIN
            users
        ON
            users.id = help_requests.author_id
        JOIN
            help_types
        ON
            help_types.id = help_requests.help_type_id
        WHERE 
            help_requests.id = $1`, [helpRequestIid]);
    const request = helpRequest.rows;
    return { request, helpRequestOffersRows };
});
exports.getByHelpRequestId = getByHelpRequestId;
