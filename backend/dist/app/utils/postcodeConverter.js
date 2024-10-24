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
exports.postcodeConverter = void 0;
const axios_1 = __importDefault(require("axios"));
const postcodeConverter = (postcode) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get(`https://api.postcodes.io/postcodes/${postcode}`);
        if (response.data.status === 200) {
            const { latitude, longitude } = response.data.result;
            return { latitude, longitude };
        }
        else {
            console.error(`Error: ${response.data.status} - Unable to find postcode.`);
            return null;
        }
    }
    catch (error) {
        console.error("Error fetching postcode data:", error);
        return null;
    }
});
exports.postcodeConverter = postcodeConverter;
