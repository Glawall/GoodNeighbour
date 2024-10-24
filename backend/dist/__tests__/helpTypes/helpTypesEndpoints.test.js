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
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../app/app"));
const connection_1 = __importDefault(require("../../app/connection"));
const test_1 = require("../../app/db/seeds/data/test");
const seed_1 = __importDefault(require("../../app/db/seeds/seed"));
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield connection_1.default.query("BEGIN");
    yield (0, seed_1.default)(test_1.testData);
}));
afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield connection_1.default.query("ROLLBACK");
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield connection_1.default.end();
}));
describe("getAllHelpRequests", () => {
    test("200 - GET: responds with an array of help request objects with the appropriate properties", () => __awaiter(void 0, void 0, void 0, function* () {
        const { body: { helpTypes }, } = yield (0, supertest_1.default)(app_1.default).get("/api/help-types").expect(200);
        helpTypes.forEach((helpType) => {
            expect(helpType).toHaveProperty("name");
            expect(helpType).toHaveProperty("description");
        });
    }));
});
