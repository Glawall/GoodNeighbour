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
exports.getByHelpRequestId = void 0;
const helpRequestsRepo = __importStar(require("../../repositories/helpRequests/getByHelpRequestId"));
const AppError_1 = require("../../errors/AppError");
const errors_1 = require("../../errors/errors");
const getByHelpRequestId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const { request, helpRequestOffersRows } = yield helpRequestsRepo.getByHelpRequestId(id);
    if (!request.length) {
        throw new AppError_1.AppError(errors_1.errors.HELP_REQUEST_NOT_FOUND);
    }
    const reqDetails = request[0];
    const reqObj = {
        id: reqDetails.help_request_id,
        title: reqDetails.title,
        author_id: reqDetails.author_id,
        help_type: reqDetails.name,
        description: reqDetails.description,
        created_at: reqDetails.created_at,
        req_date: reqDetails.req_date,
        status: reqDetails.status,
        help_type_id: reqDetails.help_type_id,
        name: reqDetails.help_type_name,
    };
    const requesterObj = {
        id: reqDetails.author_id,
        first_name: reqDetails.first_name,
        last_name: reqDetails.last_name,
        postcode: reqDetails.postcode,
        additional_contacts: reqDetails.additional_contacts,
        phone_number: reqDetails.phone_number,
        address: reqDetails.address,
    };
    const offersArr = helpRequestOffersRows.map((offer) => ({
        status: offer.status,
        helper: {
            id: offer.helper_id,
            first_name: offer.first_name,
            last_name: offer.last_name,
            postcode: offer.postcode,
            description: offer.description,
            additional_contacts: offer.additional_contacts,
            phone_number: offer.phone_number,
            address: offer.address,
        },
    }));
    return {
        request: reqObj,
        requester: requesterObj,
        offers: offersArr,
    };
});
exports.getByHelpRequestId = getByHelpRequestId;
