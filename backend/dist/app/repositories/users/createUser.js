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
exports.createUser = void 0;
const connection_1 = __importDefault(require("../../connection"));
const postcodeConverter_1 = require("../../utils/postcodeConverter");
const AppError_1 = require("../../errors/AppError");
const errors_1 = require("../../errors/errors");
const createUser = (userBody) => __awaiter(void 0, void 0, void 0, function* () {
    const { first_name, last_name, address, postcode } = userBody;
    const coordinates = yield (0, postcodeConverter_1.postcodeConverter)(postcode.toString());
    let latitude;
    let longitude;
    if (coordinates) {
        latitude = coordinates.latitude;
        longitude = coordinates.longitude;
    }
    userBody.longitude = longitude;
    userBody.latitude = latitude;
    const { username, email, avatar_url, age, about, phone_number, additional_contacts, help_radius, } = userBody;
    if (!first_name ||
        !last_name ||
        !address ||
        !postcode ||
        !longitude ||
        !latitude ||
        !help_radius) {
        throw new AppError_1.AppError(errors_1.errors.MANDATORY_FIELD_ERROR);
    }
    const values = [
        username,
        email,
        avatar_url,
        age,
        first_name,
        last_name,
        about,
        address,
        postcode,
        phone_number,
        additional_contacts,
        help_radius,
        longitude,
        latitude,
    ];
    const query = `
    INSERT INTO users 
    (username, email, avatar_url, age, first_name, last_name, about, address, postcode, phone_number, additional_contacts, help_radius, longitude, latitude)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
    RETURNING id, username, email, avatar_url, age, first_name, last_name, about, address, postcode, phone_number, additional_contacts, help_radius, longitude, latitude;
  `;
    const { rows } = yield connection_1.default.query(query, values);
    return rows[0];
});
exports.createUser = createUser;
