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
exports.updateHelpOffer = void 0;
const connection_1 = __importDefault(require("../../connection"));
const updateHelpOffer = (help_request_id, helper_id, helpOfferBody) => __awaiter(void 0, void 0, void 0, function* () {
    const { status } = helpOfferBody;
    const values = [status, helper_id, help_request_id];
    const query = `
    UPDATE 
        help_offers 
    SET status = $1 
    WHERE helper_id = $2 
    AND help_request_id = $3 
    RETURNING helper_id, help_request_id, status`;
    const { rows } = yield connection_1.default.query(query, values);
    return rows[0];
});
exports.updateHelpOffer = updateHelpOffer;
