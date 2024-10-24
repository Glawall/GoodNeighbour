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
exports.getByUserId = void 0;
const helpOffersRepo = __importStar(require("../../repositories/helpOffers/getByUserId"));
const AppError_1 = require("../../errors/AppError");
const errors_1 = require("../../errors/errors");
const utils_1 = require("../../utils");
const getByUserId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, utils_1.userExists)(userId);
    const { requests, offers } = yield helpOffersRepo.getByUserId(userId);
    const userHelpOffers = [];
    requests.forEach((req) => {
        const reqObj = {
            id: req.help_request_id,
            title: req.title,
            help_type: req.name,
            description: req.description,
            created_at: req.created_at,
            req_date: req.req_date,
            status: req.status,
        };
        const requesterObj = {
            id: req.id,
            first_name: req.first_name,
            last_name: req.last_name,
            postcode: req.postcode,
        };
        const offersArr = [];
        offers.forEach((offer) => {
            if (req.help_request_id === offer.help_request_id &&
                offer.id === userId) {
                offersArr.push({
                    status: offer.status,
                    helper: {
                        id: offer.id,
                        first_name: offer.first_name,
                        last_name: offer.last_name,
                    },
                });
            }
            if (req.help_request_id === offer.help_request_id &&
                offer.id !== userId &&
                offer.status === "accepted") {
                offersArr.push({
                    status: offer.status,
                    helper: {
                        id: offer.id,
                        first_name: offer.first_name,
                        last_name: offer.last_name,
                    },
                });
            }
        });
        userHelpOffers.push({
            request: reqObj,
            requester: requesterObj,
            offers: offersArr,
        });
    });
    if (!userHelpOffers) {
        throw new AppError_1.AppError(errors_1.errors.REPOSITORY_ERROR);
    }
    return userHelpOffers;
});
exports.getByUserId = getByUserId;
