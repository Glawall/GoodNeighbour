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
describe("getByHelpRequestId", () => {
    test("200 - GET: Responds with an array of help offer objects that have the help_request_id", () => __awaiter(void 0, void 0, void 0, function* () {
        const { body: { helpOffers }, } = yield (0, supertest_1.default)(app_1.default).get("/api/help-requests/9/help-offers").expect(200);
        helpOffers.forEach((offer) => {
            expect(offer).toHaveProperty("user_id");
            expect(offer).toHaveProperty("first_name");
            expect(offer).toHaveProperty("address");
            expect(offer).toHaveProperty("email");
            expect(offer).toHaveProperty("phone_number");
            expect(offer.help_request_id).toBe(9);
            expect(offer).toHaveProperty("status");
        });
    }));
    test("404 - GET: Responds with appropriate error when invalid help_request_id provided", () => __awaiter(void 0, void 0, void 0, function* () {
        const { body: { error: { message }, }, } = yield (0, supertest_1.default)(app_1.default)
            .get("/api/help-requests/gfrf/help-offers")
            .expect(400);
        expect(message).toBe("Invalid help request id provided");
    }));
    test("404 - GET: Responds with error when help request does not exist", () => __awaiter(void 0, void 0, void 0, function* () {
        const { body: { error: { message }, }, } = yield (0, supertest_1.default)(app_1.default)
            .get("/api/help-requests/999/help-offers") // Assuming this ID doesn't exist
            .expect(404);
        expect(message).toBe("Help request was not found");
    }));
});
describe("createHelpOffer", () => {
    test("201 - POST: Responds with a newly created help offer", () => __awaiter(void 0, void 0, void 0, function* () {
        const helpOfferBody = {
            help_request_id: 7,
            status: "active",
        };
        const { body: { newHelpOffer }, } = yield (0, supertest_1.default)(app_1.default)
            .post("/api/users/9/help-offers")
            .send(helpOfferBody)
            .set("X-User-ID", "9")
            .expect(201);
        expect(newHelpOffer).toMatchObject({
            helper_id: 9,
            help_request_id: 7,
            status: "active",
        });
    }));
    test("400 - POST: Responds with appropriate error when invalid user_id provided", () => __awaiter(void 0, void 0, void 0, function* () {
        const helpOfferBody = {
            help_request_id: 2,
            status: "active",
        };
        const { body: { error: { message }, }, } = yield (0, supertest_1.default)(app_1.default)
            .post("/api/users/gthty/help-offers")
            .send(helpOfferBody)
            .expect(400);
        expect(message).toBe("Invalid user id provided");
    }));
    test("400 - POST: Responds with appropriate error when user_id does not match authorization id", () => __awaiter(void 0, void 0, void 0, function* () {
        const helpOfferBody = {
            help_request_id: 2,
            status: "active",
        };
        const { body: { error: { message }, }, } = yield (0, supertest_1.default)(app_1.default)
            .post("/api/users/1/help-offers")
            .set("X-User-ID", "9")
            .send(helpOfferBody)
            .expect(401);
        expect(message).toBe("User is not authorised");
    }));
    test("400 - POST: Responds with appropriate error when invalid body fields provided", () => __awaiter(void 0, void 0, void 0, function* () {
        const helpOfferBody = {
            status: "active",
        };
        const { body: { error: { message }, }, } = yield (0, supertest_1.default)(app_1.default)
            .post("/api/users/5/help-offers")
            .send(helpOfferBody)
            .expect(400);
        expect(message).toBe("Invalid input provided");
    }));
    test("400 - POST: Responds with appropriate error when nonexistent user_id provided", () => __awaiter(void 0, void 0, void 0, function* () {
        const helpOfferBody = {
            help_request_id: 2,
            status: "active",
        };
        const { body: { error: { message }, }, } = yield (0, supertest_1.default)(app_1.default)
            .post("/api/users/25/help-offers")
            .send(helpOfferBody)
            .set("X-User-ID", "25")
            .expect(400);
        expect(message).toBe("User was not found");
    }));
});
describe("getByUserId", () => {
    test("200 - GET: Responds with an array of objects that have request, requester, offer objects with the appropriate properties", () => __awaiter(void 0, void 0, void 0, function* () {
        const { body: { userHelpOffers }, } = yield (0, supertest_1.default)(app_1.default)
            .get("/api/users/7/help-offers")
            .set("X-User-ID", "7")
            .expect(200);
        userHelpOffers.forEach((offer) => {
            expect(offer.request).toHaveProperty("id");
            expect(offer.request).toHaveProperty("title");
            expect(offer.request).toHaveProperty("help_type");
            expect(offer.request).toHaveProperty("description");
            expect(offer.request).toHaveProperty("created_at");
            expect(offer.request).toHaveProperty("req_date");
            expect(offer.request).toHaveProperty("status");
            expect(offer.requester).toHaveProperty("first_name");
            expect(offer.requester).toHaveProperty("last_name");
            expect(offer.requester).toHaveProperty("id");
            expect(offer.offers[0]).toHaveProperty("status");
            expect(offer.offers[0]).toHaveProperty("helper");
            offer.offers.forEach((off) => {
                expect(typeof off.helper.id).toBe("number");
                expect(typeof off.helper.first_name).toBe("string");
                expect(typeof off.helper.last_name).toBe("string");
            });
        });
    }));
    test("404 - GET: Responds with appropriate error when invalid user id provided", () => __awaiter(void 0, void 0, void 0, function* () {
        const { body: { error: { message }, }, } = yield (0, supertest_1.default)(app_1.default).get("/api/users/gfrf/help-offers").expect(400);
        expect(message).toBe("Invalid user id provided");
    }));
    test("401 - GET: Responds when user id does not match authorisation id", () => __awaiter(void 0, void 0, void 0, function* () {
        const { body: { error: { message }, }, } = yield (0, supertest_1.default)(app_1.default).get("/api/users/999/help-offers").expect(401);
        expect(message).toBe("User is not authorised");
    }));
    test("404 - GET: Responds with appropriate error when nonexistent user_id provided", () => __awaiter(void 0, void 0, void 0, function* () {
        const { body: { error: { message }, }, } = yield (0, supertest_1.default)(app_1.default)
            .get("/api/users/500/help-offers")
            .set("X-User-ID", "500")
            .expect(404);
        expect(message).toBe("User was not found");
    }));
});
describe("getByHelperIdAndHelpRequestId", () => {
    test("200 - GET: Responds with an offer object with the correct properties", () => __awaiter(void 0, void 0, void 0, function* () {
        const { body: { helpOffer }, } = yield (0, supertest_1.default)(app_1.default)
            .get("/api/help-requests/1/help-offers/1")
            .set("X-User-ID", "1")
            .expect(200);
        expect(helpOffer).toMatchObject({
            helper_id: 1,
            help_request_id: 1,
            status: "accepted",
        });
    }));
    test("404 - GET: Responds with appropriate error when help request id provided", () => __awaiter(void 0, void 0, void 0, function* () {
        const { body: { error: { message }, }, } = yield (0, supertest_1.default)(app_1.default)
            .get("/api/help-requests/gfrf/help-offers/1")
            .set("X-User-ID", "1")
            .expect(400);
        expect(message).toBe("Invalid help request id provided");
    }));
    test("404 - GET: Responds with appropriate error when given non-existent help request id", () => __awaiter(void 0, void 0, void 0, function* () {
        const { body: { error: { message }, }, } = yield (0, supertest_1.default)(app_1.default)
            .get("/api/help-requests/999/help-offers/3")
            .set("X-User-ID", "3")
            .expect(404);
        expect(message).toBe("Help request was not found");
    }));
    test("401 - GET: Responds when user id does not match authorisation id", () => __awaiter(void 0, void 0, void 0, function* () {
        const { body: { error: { message }, }, } = yield (0, supertest_1.default)(app_1.default)
            .get("/api/help-requests/1/help-offers/5")
            .set("X-User-ID", "9")
            .expect(401);
        expect(message).toBe("User is not authorised");
    }));
    test("404 - GET: Responds with appropriate error when nonexistent user_id provided", () => __awaiter(void 0, void 0, void 0, function* () {
        const { body: { error: { message }, }, } = yield (0, supertest_1.default)(app_1.default)
            .get("/api/help-requests/1/help-offers/500")
            .set("X-User-ID", "500")
            .expect(404);
        expect(message).toBe("User was not found");
    }));
    test("404 - GET: Responds with appropriate error when help offer not found", () => __awaiter(void 0, void 0, void 0, function* () {
        const { body: { error: { message }, }, } = yield (0, supertest_1.default)(app_1.default)
            .get("/api/help-requests/7/help-offers/1")
            .set("X-User-ID", "1")
            .expect(404);
        expect(message).toBe("Help offer was not found");
    }));
});
describe("removeHelpOffer", () => {
    test("204 - DELETE removes a help offer and responds with a 204", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default)
            .delete("/api/help-requests/1/help-offers/1")
            .set("X-User-ID", "1")
            .expect(204);
    }));
    test("404 - DELETE returns not found if user does not exist", () => __awaiter(void 0, void 0, void 0, function* () {
        const { body: { error: { message }, }, } = yield (0, supertest_1.default)(app_1.default)
            .delete("/api/help-requests/1/help-offers/999")
            .set("X-User-ID", "1")
            .expect(404);
        expect(message).toBe("User was not found");
    }));
    test("404 - DELETE returns not found if user does not exist", () => __awaiter(void 0, void 0, void 0, function* () {
        const { body: { error: { message }, }, } = yield (0, supertest_1.default)(app_1.default)
            .delete("/api/help-requests/1/help-offers/999")
            .set("X-User-ID", "1")
            .expect(404);
        expect(message).toBe("User was not found");
    }));
    test("401 - DELETE returns not found if help offer does not exist", () => __awaiter(void 0, void 0, void 0, function* () {
        const { body: { error: { message }, }, } = yield (0, supertest_1.default)(app_1.default)
            .delete("/api/help-requests/2/help-offers/3")
            .set("X-User-ID", "3")
            .expect(404);
        expect(message).toBe("Help offer was not found");
    }));
    test("400 - DELETE returns bad request if help request id is invalid", () => __awaiter(void 0, void 0, void 0, function* () {
        const { body: { error: { message }, }, } = yield (0, supertest_1.default)(app_1.default)
            .delete("/api/help-requests/invalid/help-offers/8")
            .set("X-User-ID", "1")
            .expect(400);
        expect(message).toBe("Invalid help request id provided");
    }));
});
describe("updateHelpOffer", () => {
    test("200 - PATCH: Responds with an updated help offer status,", () => __awaiter(void 0, void 0, void 0, function* () {
        const helpOfferBody = {
            status: "active",
        };
        const { body: { updatedHelpOffer }, } = yield (0, supertest_1.default)(app_1.default)
            .patch("/api/help-requests/9/help-offers/8")
            .set("X-User-ID", "9")
            .send(helpOfferBody)
            .expect(200);
        expect(updatedHelpOffer).toMatchObject({
            helper_id: 8,
            help_request_id: 9,
            status: "active",
        });
    }));
    test("404 - PATCH: Responds with appropriate error when invalid help_request_id provided", () => __awaiter(void 0, void 0, void 0, function* () {
        const helpOfferBody = {
            status: "active",
        };
        const { body: { error: { message }, }, } = yield (0, supertest_1.default)(app_1.default)
            .patch("/api/help-requests/gfrf/help-offers/1")
            .set("X-User-ID", "9")
            .send(helpOfferBody)
            .expect(400);
        expect(message).toBe("Invalid help request id provided");
    }));
    test("400 - PATCH: Responds with a validation error if help request ID is invalid", () => __awaiter(void 0, void 0, void 0, function* () {
        const helpOfferBody = {
            status: "active",
        };
        const { body: { error: { message }, }, } = yield (0, supertest_1.default)(app_1.default)
            .patch("/api/help-requests/invalid/help-offers/8")
            .set("X-User-ID", "9")
            .send(helpOfferBody)
            .expect(400);
        expect(message).toBe("Invalid help request id provided");
    }));
    test("404 - PATCH: Responds with not found if help request does not exist", () => __awaiter(void 0, void 0, void 0, function* () {
        const helpOfferBody = {
            status: "active",
        };
        const { body: { error: { message }, }, } = yield (0, supertest_1.default)(app_1.default)
            .patch("/api/help-requests/999/help-offers/8")
            .set("X-User-ID", "9")
            .send(helpOfferBody)
            .expect(404);
        expect(message).toBe("Help request was not found");
    }));
    test("401 - PATCH: Responds with unauthorized error if user is not the requester or helper", () => __awaiter(void 0, void 0, void 0, function* () {
        const helpOfferBody = {
            status: "active",
        };
        const { body: { error: { message }, }, } = yield (0, supertest_1.default)(app_1.default)
            .patch("/api/help-requests/9/help-offers/8")
            .set("X-User-ID", "10")
            .send(helpOfferBody)
            .expect(401);
        expect(message).toBe("User is not authorised");
    }));
    test("404 - PATCH: Responds with not found if help offer does not exist", () => __awaiter(void 0, void 0, void 0, function* () {
        const helpOfferBody = {
            status: "active",
        };
        const { body: { error: { message }, }, } = yield (0, supertest_1.default)(app_1.default)
            .patch("/api/help-requests/5/help-offers/3")
            .set("X-User-ID", "3")
            .send(helpOfferBody)
            .expect(404);
        expect(message).toBe("Help offer was not found");
    }));
});
