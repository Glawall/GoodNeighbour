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
exports.getByUserId = void 0;
const connection_1 = __importDefault(require("../../connection"));
const getByUserId = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    const userOffers = yield connection_1.default.query(`SELECT
            users.id AS user_id,
            users.first_name,
            users.last_name,
            help_offers.status,
            help_offers.helper_id,
            help_offers.help_request_id

        FROM
            users
        LEFT JOIN
            help_offers
        ON
            help_offers.helper_id = users.id
        WHERE
            users.id = $1`, [user_id]);
    const userRows = userOffers.rows;
    const requestId = userRows.map((user) => user.help_request_id);
    let whereRequestVals = [];
    if (requestId.length !== 0) {
        requestId.forEach((id, index) => whereRequestVals.push(`help_requests.id = $${index + 1}`));
    }
    const helpRequests = yield connection_1.default.query(`SELECT
        users.id,
        users.first_name,
        users.last_name,
        users.postcode,
        help_requests.id AS help_request_id,
        help_requests.title,
        help_requests.description,
        help_requests.created_at,
        help_requests.req_date,
        help_requests.status,
        help_requests.help_type_id,
        help_types.name

        FROM
            help_requests
        LEFT JOIN
            users
        ON
            users.id = help_requests.author_id
        LEFT JOIN
            help_types
        ON
            help_types.id = help_requests.help_type_id
        WHERE ${whereRequestVals.join(` OR `)}`, requestId);
    const requests = helpRequests.rows;
    let whereOffersVals = [];
    if (requestId.length !== 0) {
        requestId.forEach((id, index) => whereOffersVals.push(`help_offers.help_request_id = $${index + 1}`));
    }
    const acceptedOffers = yield connection_1.default.query(`SELECT
        help_offers.status,
        help_offers.help_request_id,
        users.id,
        users.first_name,
        users.last_name,
        users.postcode

        FROM
            help_offers
        LEFT JOIN
            users
        ON
            users.id = help_offers.helper_id
        WHERE ${whereOffersVals.join(` OR `)}`, requestId);
    const offers = acceptedOffers.rows;
    return { requests, offers };
});
exports.getByUserId = getByUserId;
