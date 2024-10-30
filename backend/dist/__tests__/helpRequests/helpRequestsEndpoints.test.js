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
describe.only("getAllHelpRequests", () => {
    test("200 - GET: responds with an array of help request objects with the appropriate properties", () => __awaiter(void 0, void 0, void 0, function* () {
        const { body: { helpRequests }, } = yield (0, supertest_1.default)(app_1.default).get("/api/help-requests").expect(200);
        helpRequests.forEach((helpRequest) => {
            expect(helpRequest).toHaveProperty("id");
            expect(helpRequest).toHaveProperty("title");
            expect(helpRequest).toHaveProperty("author_id");
            expect(helpRequest).toHaveProperty("help_type_id");
            expect(helpRequest).toHaveProperty("description");
            expect(helpRequest).toHaveProperty("created_at");
            expect(helpRequest).toHaveProperty("req_date");
            expect(helpRequest).toHaveProperty("status");
            expect(helpRequest).toHaveProperty("id");
            expect(helpRequest).toHaveProperty("title");
            expect(helpRequest).toHaveProperty("author_first_name");
            expect(helpRequest).toHaveProperty("author_last_name");
            expect(helpRequest).toHaveProperty("author_address");
            expect(helpRequest).toHaveProperty("author_username");
            expect(helpRequest).toHaveProperty("author_postcode");
            expect(helpRequest).toHaveProperty("author_longitude");
            expect(helpRequest).toHaveProperty("author_latitude");
        });
    }));
});
describe("getByHelpRequestId", () => {
    test("200 - GET: responds with an a help request object, based on help_request_id", () => __awaiter(void 0, void 0, void 0, function* () {
        const { body: { helpRequest }, } = yield (0, supertest_1.default)(app_1.default).get("/api/help-requests/1").expect(200);
        expect(helpRequest.request).toMatchObject({
            id: 1,
            title: "Need help with grocery shopping",
            author_id: 1,
            description: "I need someone to help me with my weekly grocery shopping this Monday",
            created_at: "2024-05-21T12:34:56.789Z",
            req_date: "2024-05-27T10:00:00.000Z",
            status: "active",
            help_type_id: 1,
            name: "Shopping",
        });
    }));
    test("404 - GET: responds with an error if help request is not found", () => __awaiter(void 0, void 0, void 0, function* () {
        const { body: { error }, } = yield (0, supertest_1.default)(app_1.default).get("/api/help-requests/999").expect(404);
        expect(error).toMatchObject({
            message: "Help request was not found",
        });
    }));
    test("400 - GET: responds with an error if help_request_id is invalid", () => __awaiter(void 0, void 0, void 0, function* () {
        const { body: { error }, } = yield (0, supertest_1.default)(app_1.default).get("/api/help-requests/invalid_id").expect(400);
        expect(error).toMatchObject({
            message: "Invalid help request id provided",
        });
    }));
});
describe("getByUserId", () => {
    test("200 - GET: responds with an array of help-request objects, based related to the user based on their user_id", () => __awaiter(void 0, void 0, void 0, function* () {
        const { body: { helpRequests }, } = yield (0, supertest_1.default)(app_1.default).get("/api/users/1/help-requests").expect(200);
        helpRequests.forEach((helpRequest) => {
            expect(helpRequest).toHaveProperty("id");
            expect(helpRequest).toHaveProperty("title");
            expect(helpRequest.author_id).toBe(1);
            expect(helpRequest).toHaveProperty("help_type_id");
            expect(helpRequest).toHaveProperty("description");
            expect(helpRequest).toHaveProperty("created_at");
            expect(helpRequest).toHaveProperty("req_date");
            expect(helpRequest).toHaveProperty("status");
        });
    }));
    test("404 - GET: responds with an error when the user does not exist", () => __awaiter(void 0, void 0, void 0, function* () {
        const { body: { error }, } = yield (0, supertest_1.default)(app_1.default).get("/api/users/9999/help-requests").expect(404);
        expect(error).toMatchObject({ message: "User was not found" });
    }));
    test("400 - GET: responds with an error when the user_id is not a valid number", () => __awaiter(void 0, void 0, void 0, function* () {
        const { body: { error }, } = yield (0, supertest_1.default)(app_1.default).get("/api/users/invalid/help-requests").expect(400);
        expect(error).toMatchObject({ message: "Invalid user id provided" });
    }));
});
describe("createHelpRequest", () => {
    test("204 - POST: responds with a newly created user", () => __awaiter(void 0, void 0, void 0, function* () {
        const helpRequestBody = {
            title: "Help with my prescription collection",
            help_type: "Shopping",
            description: "Would someone be able to go collect my prescription",
            req_date: "2024-05-27T10:00:00.000Z",
        };
        const { body: { newHelpRequest }, } = yield (0, supertest_1.default)(app_1.default)
            .post("/api/help-requests")
            .set("X-User-ID", "1")
            .send(helpRequestBody)
            .expect(201);
        expect(newHelpRequest).toMatchObject({
            title: "Help with my prescription collection",
            author_id: 1,
            help_type_id: 1,
            id: expect.any(Number),
            created_at: expect.any(String),
            description: "Would someone be able to go collect my prescription",
            req_date: "2024-05-27T10:00:00.000Z",
            status: "active",
        });
    }));
    test("400 - POST: responds with an error if parameters are missing", () => __awaiter(void 0, void 0, void 0, function* () {
        const helpRequestBody = {
            title: "Help with my prescription collection",
            help_type: "Shopping",
            description: "Would someone be able to go collect my prescription",
        };
        const { body: { error }, } = yield (0, supertest_1.default)(app_1.default)
            .post("/api/help-requests")
            .set("X-User-ID", "1")
            .send(helpRequestBody)
            .expect(400);
        expect(error).toEqual({
            message: "You need to fill in the mandatory field",
        });
    }));
    test("400 - POST: responds with an error if user ID is invalid", () => __awaiter(void 0, void 0, void 0, function* () {
        const helpRequestBody = {
            title: "Help with my prescription collection",
            help_type: "Shopping",
            description: "Would someone be able to go collect my prescription",
            req_date: "2024-05-27T10:00:00.000Z",
        };
        const { body: { error }, } = yield (0, supertest_1.default)(app_1.default)
            .post("/api/help-requests")
            .set("X-User-ID", "invalid-id")
            .send(helpRequestBody)
            .expect(400);
        expect(error).toEqual({
            message: "Invalid user id provided",
        });
    }));
    test("400 - POST: responds with an error if user ID is invalid", () => __awaiter(void 0, void 0, void 0, function* () {
        const helpRequestBody = {
            title: "Help with my prescription collection",
            help_type: "Shopping",
            description: "Would someone be able to go collect my prescription",
            req_date: "2024-05-27T10:00:00.000Z",
        };
        const { body: { error }, } = yield (0, supertest_1.default)(app_1.default)
            .post("/api/help-requests")
            .set("X-User-ID", "invalid-id")
            .send(helpRequestBody)
            .expect(400);
        expect(error).toEqual({
            message: "Invalid user id provided",
        });
    }));
});
describe("updateHelpRequest", () => {
    test("200 PATCH: responds with an updated help request", () => __awaiter(void 0, void 0, void 0, function* () {
        const helpRequestBody = {
            title: "Help with my prescription collection",
            help_type: "Shopping",
            description: "Would someone be able to go collect my prescription",
            req_date: "2024-05-27T10:00:00.000Z",
        };
        const { body: { updatedHelpRequest }, } = yield (0, supertest_1.default)(app_1.default)
            .patch("/api/help-requests/1")
            .set("X-User-ID", "1")
            .send(helpRequestBody)
            .expect(200);
        expect(updatedHelpRequest).toMatchObject({
            title: "Help with my prescription collection",
            author_id: 1,
            help_type_id: 1,
            id: expect.any(Number),
            created_at: expect.any(String),
            description: "Would someone be able to go collect my prescription",
            req_date: "2024-05-27T10:00:00.000Z",
            status: "active",
        });
    }));
    test("404 - PATCH: responds with a not found error when help request does not exist", () => __awaiter(void 0, void 0, void 0, function* () {
        const helpRequestBody = {
            title: "Help with my prescription collection",
        };
        const { body: { error }, } = yield (0, supertest_1.default)(app_1.default)
            .patch("/api/help-requests/999")
            .set("X-User-ID", "1")
            .send(helpRequestBody)
            .expect(404);
        expect(error).toEqual({ message: "Help request was not found" });
    }));
    test("404 - PATCH: responds with a not found error when help request does not exist", () => __awaiter(void 0, void 0, void 0, function* () {
        const helpRequestBody = {
            title: "Help with my prescription collection",
        };
        const { body: { error }, } = yield (0, supertest_1.default)(app_1.default)
            .patch("/api/help-requests/invalid")
            .set("X-User-ID", "1")
            .send(helpRequestBody)
            .expect(400);
        expect(error).toEqual({ message: "Invalid help request id provided" });
    }));
    test("403 - PATCH: responds with an authorization error when user is not allowed to update", () => __awaiter(void 0, void 0, void 0, function* () {
        const helpRequestBody = {
            title: "Attempt to update without permission",
        };
        const { body: { error }, } = yield (0, supertest_1.default)(app_1.default)
            .patch("/api/help-requests/1")
            .set("X-User-ID", "2")
            .send(helpRequestBody)
            .expect(401);
        expect(error).toEqual({
            message: "You are not authorised to update this help request",
        });
    }));
});
describe("removeHelpRequest", () => {
    test("204 - DELETE removes a help request and respodns with a 204", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default)
            .delete("/api/help-requests/1")
            .set("X-User-ID", "1")
            .expect(204);
    }));
    test("404 - DELETE returns not found if help offer does not exist", () => __awaiter(void 0, void 0, void 0, function* () {
        const { body: { error: { message }, }, } = yield (0, supertest_1.default)(app_1.default)
            .delete("/api/help-requests/999/")
            .set("X-User-ID", "1")
            .expect(404);
        expect(message).toBe("Help request was not found");
    }));
    test("401 - DELETE returns unauthorised if user is not authorized", () => __awaiter(void 0, void 0, void 0, function* () {
        const { body: { error: { message }, }, } = yield (0, supertest_1.default)(app_1.default)
            .delete("/api/help-requests/1")
            .set("X-User-ID", "2")
            .expect(401);
        expect(message).toBe("You are not authorised to delete this help request");
    }));
    test("400 - DELETE returns bad request if parameters are invalid", () => __awaiter(void 0, void 0, void 0, function* () {
        const { body: { error: { message }, }, } = yield (0, supertest_1.default)(app_1.default)
            .delete("/api/help-requests/invalid")
            .set("X-User-ID", "1")
            .expect(400);
        expect(message).toBe("Invalid help request id provided");
    }));
});
