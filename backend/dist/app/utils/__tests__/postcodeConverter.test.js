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
const axios_1 = __importDefault(require("axios"));
const axios_mock_adapter_1 = __importDefault(require("axios-mock-adapter"));
const postcodeConverter_1 = require("../postcodeConverter");
const mock = new axios_mock_adapter_1.default(axios_1.default);
describe("postcodeConverter", () => {
    afterEach(() => {
        mock.reset();
    });
    test("should return latitude and longitude for a valid postcode", () => __awaiter(void 0, void 0, void 0, function* () {
        const postcode = "SW1A 1AA";
        const mockResponse = {
            status: 200,
            result: {
                postcode: "SW1A 1AA",
                quality: 1,
                eastings: 529102,
                northings: 179888,
                country: "England",
                nhs_ha: "NHS England",
                administrative_district: "Westminster",
                administrative_county: null,
                ward: "St James's",
                parish: null,
                parliamentary_constituency: "Cities of London and Westminster",
                european_electoral_region: "London",
                region: "London",
                continent: "Europe",
                longitude: -0.141588,
                latitude: 51.501009,
            },
        };
        mock
            .onGet(`https://api.postcodes.io/postcodes/${postcode}`)
            .reply(200, mockResponse);
        const coordinates = yield (0, postcodeConverter_1.postcodeConverter)(postcode);
        expect(coordinates).toEqual({ latitude: 51.501009, longitude: -0.141588 });
    }));
    test("should return null for an invalid postcode", () => __awaiter(void 0, void 0, void 0, function* () {
        const postcode = "INVALID";
        mock.onGet(`https://api.postcodes.io/postcodes/${postcode}`).reply(404, {
            status: 404,
            error: "Postcode not found",
        });
        const coordinates = yield (0, postcodeConverter_1.postcodeConverter)(postcode);
        expect(coordinates).toBeNull();
    }));
    test("should handle API errors", () => __awaiter(void 0, void 0, void 0, function* () {
        const postcode = "SW1A 1AA";
        mock.onGet(`https://api.postcodes.io/postcodes/${postcode}`).networkError();
        const coordinates = yield (0, postcodeConverter_1.postcodeConverter)(postcode);
        expect(coordinates).toBeNull();
    }));
});
