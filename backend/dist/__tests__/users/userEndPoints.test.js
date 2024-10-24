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
describe("createUser", () => {
    test("201 - POST: Responds with a newly created user", () => __awaiter(void 0, void 0, void 0, function* () {
        const userBody = {
            username: "glawall",
            email: "glawall@hotmail.com",
            avatar_url: "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1215.jpg",
            age: 26,
            first_name: "John",
            last_name: "Doe",
            about: "Censura basium carcer. Delicate alius aperiam color virga cruentus traho. Correptius vesper supplanto voluptatum.",
            address: "120 College Place",
            postcode: "NW1 0DJ",
            phone_number: "079170986789",
            additional_contacts: "basium carcer. Delicate alius aperiam color virga cruentus traho. Correptius vesper supplanto voluptatum.",
            help_radius: 1500,
        };
        const { body: { newUser }, } = yield (0, supertest_1.default)(app_1.default).post("/api/users").send(userBody).expect(201);
        expect(newUser).toMatchObject({
            id: expect.any(Number),
            username: "glawall",
            email: "glawall@hotmail.com",
            avatar_url: "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1215.jpg",
            age: 26,
            first_name: "John",
            last_name: "Doe",
            about: "Censura basium carcer. Delicate alius aperiam color virga cruentus traho. Correptius vesper supplanto voluptatum.",
            address: "120 College Place",
            postcode: "NW1 0DJ",
            phone_number: "079170986789",
            additional_contacts: "basium carcer. Delicate alius aperiam color virga cruentus traho. Correptius vesper supplanto voluptatum.",
            help_radius: 1500,
            latitude: 51.538105,
            longitude: -0.136039,
        });
    }));
    test("400 - POST: Responds with error when key value pair is missing", () => __awaiter(void 0, void 0, void 0, function* () {
        const userBody = {
            email: "glawall@hotmail.com",
            avatar_url: "https://example.com/avatar.jpg",
            age: 26,
            last_name: "Doe",
            about: "Some about text.",
            address: "120 College Place",
            postcode: "NW1 0DJ",
            phone_number: "079170986789",
            additional_contacts: "Some additional contacts.",
            help_radius: 1500,
        };
        const { body: { error: { message }, }, } = yield (0, supertest_1.default)(app_1.default).post("/api/users").send(userBody).expect(400);
        expect(message).toMatch("You need to fill in the mandatory field");
    }));
});
describe("getUserById", () => {
    test("200 - GET: Responds with a user with corresponding id", () => __awaiter(void 0, void 0, void 0, function* () {
        const { body: { user }, } = yield (0, supertest_1.default)(app_1.default).get("/api/users/1").expect(200);
        expect(user).toMatchObject({
            id: 1,
            username: "Cuthbert85",
            email: "Cuthbert_Wilkinson47@gmail.com",
            avatar_url: "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1055.jpg",
            age: 72,
            first_name: "Cuthbert",
            last_name: "Wilkinson",
            about: "I enjoy playing chess and reading books",
            address: "14 Craven Terrace, London",
            postcode: "W2 3QH",
            phone_number: "07624 985321",
            additional_contacts: "Please call me in the afternoons",
            help_radius: 1200,
            latitude: 51.5072,
            longitude: -0.1806,
        });
    }));
    test("404 - GET: Responds with appropriate error when nonexistent user_id provided", () => __awaiter(void 0, void 0, void 0, function* () {
        const { body: { error: { message }, }, } = yield (0, supertest_1.default)(app_1.default).get("/api/users/15").expect(404);
        expect(message).toBe("User was not found");
    }));
    test("400 - GET: Responds with appropriate error when invalid user_id provided", () => __awaiter(void 0, void 0, void 0, function* () {
        const { body: { error: { message }, }, } = yield (0, supertest_1.default)(app_1.default).get("/api/users/fgrg").expect(400);
        expect(message).toBe("Invalid user id provided");
    }));
});
describe("updateUser", () => {
    test("200 - PATCH: Responds with an updated email and phone_number user's fields by corresponding id", () => __awaiter(void 0, void 0, void 0, function* () {
        const userBody = {
            email: "glawall@hotmail.com",
            phone_number: "07777888999",
        };
        const { body: { updatedUser }, } = yield (0, supertest_1.default)(app_1.default)
            .patch("/api/users/1")
            .set("X-User-ID", "1")
            .send(userBody)
            .expect(200);
        expect(updatedUser).toMatchObject({
            email: "glawall@hotmail.com",
            phone_number: "07777888999",
        });
    }));
    test("400 - PATCH: Responds with bad request if user ID is invalid", () => __awaiter(void 0, void 0, void 0, function* () {
        const userBody = {
            email: "invalid@example.com",
            phone_number: "01234567890",
        };
        const { body: { error: { message }, }, } = yield (0, supertest_1.default)(app_1.default)
            .patch("/api/users/invalid")
            .send(userBody)
            .expect(400);
        expect(message).toBe("Invalid user id provided");
    }));
    test("404 - PATCH: Responds with not found if user does not exist", () => __awaiter(void 0, void 0, void 0, function* () {
        const userBody = {
            email: "nonexistent@example.com",
            phone_number: "01234567890",
        };
        const { body: { error: { message }, }, } = yield (0, supertest_1.default)(app_1.default)
            .patch("/api/users/999")
            .set("X-User-ID", "999")
            .send(userBody)
            .expect(404);
        expect(message).toBe("User was not found");
    }));
    test("401 - PATCH: Responds with unauthorized if user is not allowed to update", () => __awaiter(void 0, void 0, void 0, function* () {
        const userBody = {
            email: "email@example.com",
            phone_number: "01234567890",
        };
        const { body: { error: { message }, }, } = yield (0, supertest_1.default)(app_1.default)
            .patch("/api/users/2")
            .set("X-User-ID", "1")
            .send(userBody)
            .expect(401);
        expect(message).toBe("You are not authorised to update this user");
    }));
});
describe("getAllUsers", () => {
    test("200 - GET: Responds with an array of all users", () => __awaiter(void 0, void 0, void 0, function* () {
        const { body: { users }, } = yield (0, supertest_1.default)(app_1.default).get("/api/users").expect(200);
        users.forEach((user) => {
            expect(user).toHaveProperty("id");
            expect(user).toHaveProperty("first_name");
            expect(user).toHaveProperty("last_name");
            expect(user).toHaveProperty("email");
            expect(user).toHaveProperty("username");
            expect(user).toHaveProperty("about");
            expect(user).toHaveProperty("phone_number");
            expect(user).toHaveProperty("address");
            expect(user).toHaveProperty("postcode");
            expect(user).toHaveProperty("avatar_url");
            expect(user).toHaveProperty("age");
            expect(user).toHaveProperty("help_radius");
            expect(user).toHaveProperty("additional_contacts");
        });
    }));
});
describe("removeUser", () => {
    test("204 - Delete: responds with a status and no content", () => __awaiter(void 0, void 0, void 0, function* () {
        return (0, supertest_1.default)(app_1.default)
            .delete("/api/users/1")
            .set("X-User-ID", "1")
            .expect(204);
    }));
    test("404 - Delete: responds with not found if user does not exist", () => __awaiter(void 0, void 0, void 0, function* () {
        const { body: { error: { message }, }, } = yield (0, supertest_1.default)(app_1.default)
            .delete("/api/users/999")
            .set("X-User-ID", "999")
            .expect(404);
        expect(message).toBe("User was not found");
    }));
    test("400 - Delete: responds with bad request if user ID is invalid", () => __awaiter(void 0, void 0, void 0, function* () {
        const { body: { error: { message }, }, } = yield (0, supertest_1.default)(app_1.default).delete("/api/users/invalid").expect(400);
        expect(message).toBe("Invalid user id provided");
    }));
    test("401 - Delete: responds with forbidden if user is not authorised", () => __awaiter(void 0, void 0, void 0, function* () {
        const { body: { error: { message }, }, } = yield (0, supertest_1.default)(app_1.default)
            .delete("/api/users/2")
            .set("X-User-ID", "1")
            .expect(401);
        expect(message).toBe("You are not authorised to delete this user");
    }));
});
