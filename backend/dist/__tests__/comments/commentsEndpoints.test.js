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
describe("getCommentsByRequestId", () => {
    test("200 - GET: responds with a structured array of comments including threads", () => __awaiter(void 0, void 0, void 0, function* () {
        const { body: { comments }, } = yield (0, supertest_1.default)(app_1.default).get("/api/help-requests/10/comments").expect(200);
        expect(Array.isArray(comments)).toBe(true);
        comments.forEach((comment) => {
            expect(comment).toHaveProperty("id");
            expect(comment).toHaveProperty("author_id");
            expect(comment).toHaveProperty("help_request_id");
            expect(comment).toHaveProperty("parent_id");
            expect(comment).toHaveProperty("created_at");
            expect(comment).toHaveProperty("description");
            expect(comment).toHaveProperty("replies");
            expect(Array.isArray(comment.replies)).toBe(true);
        });
        expect(comments[0].replies[0]).toMatchObject({
            id: 10,
            author_id: 4,
            help_request_id: 10,
            parent_id: 8,
            created_at: expect.any(String),
            description: "This is a reply to the comment with parent_id 8.",
            replies: [],
        });
    }));
    test("404 - GET: responds with an error if the help request does not exist", () => __awaiter(void 0, void 0, void 0, function* () {
        const { body: { error }, } = yield (0, supertest_1.default)(app_1.default).get("/api/help-requests/999/comments").expect(404);
        expect(error).toEqual({
            message: "Help request was not found",
        });
    }));
    test("400 - GET: responds with an error for invalid help_request_id", () => __awaiter(void 0, void 0, void 0, function* () {
        const { body: { error }, } = yield (0, supertest_1.default)(app_1.default)
            .get("/api/help-requests/invalid/comments")
            .expect(400);
        expect(error).toEqual({
            message: "Invalid help request id provided",
        });
    }));
});
describe("createComment", () => {
    test("POST - 204: When given a comment body, posts comment and returns it", () => __awaiter(void 0, void 0, void 0, function* () {
        const commentBody = {
            description: "New comment here",
        };
        const { body: { newCommentBody }, } = yield (0, supertest_1.default)(app_1.default)
            .post("/api/help-requests/10/comments/8")
            .set("X-User-ID", "1")
            .send(commentBody)
            .expect(201);
        expect(newCommentBody).toMatchObject({
            id: 12,
            author_id: 1,
            help_request_id: 10,
            parent_id: 8,
            created_at: expect.any(String),
            description: "New comment here",
        });
    }));
    test("POST - 400: Returns an error when description is missing", () => __awaiter(void 0, void 0, void 0, function* () {
        const commentBody = {};
        const { body: { error }, } = yield (0, supertest_1.default)(app_1.default)
            .post("/api/help-requests/10/comments/8")
            .set("X-User-ID", "1")
            .send(commentBody)
            .expect(400);
        expect(error).toMatchObject({
            message: "You need to fill in the mandatory field",
        });
    }));
    test("POST - 404: Returns an error for invalid help_request_id", () => __awaiter(void 0, void 0, void 0, function* () {
        const commentBody = {
            description: "New comment here",
        };
        const { body: { error }, } = yield (0, supertest_1.default)(app_1.default)
            .post("/api/help-requests/999/comments/8")
            .set("X-User-ID", "1")
            .send(commentBody)
            .expect(404);
        expect(error).toMatchObject({
            message: "Help request was not found",
        });
    }));
    test("POST - 404: Returns an error for invalid parent id", () => __awaiter(void 0, void 0, void 0, function* () {
        const commentBody = {
            description: "New comment here",
        };
        const { body: { error }, } = yield (0, supertest_1.default)(app_1.default)
            .post("/api/help-requests/10/comments/invalid")
            .set("X-User-ID", "1")
            .send(commentBody)
            .expect(400);
        expect(error).toMatchObject({
            message: "Invalid input provided",
        });
    }));
    test("POST - 404: Returns an error for invalid help_request_id", () => __awaiter(void 0, void 0, void 0, function* () {
        const commentBody = {
            description: "New comment here",
        };
        const { body: { error }, } = yield (0, supertest_1.default)(app_1.default)
            .post("/api/help-requests/invalid/comments/10")
            .set("X-User-ID", "1")
            .send(commentBody)
            .expect(400);
        expect(error).toMatchObject({
            message: "Invalid help request id provided",
        });
    }));
    test("POST - 404: Returns an error for if comment_id does not exist", () => __awaiter(void 0, void 0, void 0, function* () {
        const commentBody = {
            description: "New comment here",
        };
        const { body: { error }, } = yield (0, supertest_1.default)(app_1.default)
            .post("/api/help-requests/10/comments/999")
            .set("X-User-ID", "1")
            .send(commentBody)
            .expect(404);
        expect(error).toMatchObject({
            message: "Comment was not found",
        });
    }));
    test("POST - 401: Returns an error when user ID is missing", () => __awaiter(void 0, void 0, void 0, function* () {
        const commentBody = {
            description: "New comment here",
        };
        const { body: { error }, } = yield (0, supertest_1.default)(app_1.default)
            .post("/api/help-requests/10/comments/8")
            .send(commentBody)
            .expect(401);
        expect(error).toMatchObject({
            message: "User is not authorised",
        });
    }));
});
describe("getCommentByID", () => {
    test("200 - GET: responds with an a comment object, based on comment_id", () => __awaiter(void 0, void 0, void 0, function* () {
        const { body: { comment }, } = yield (0, supertest_1.default)(app_1.default).get("/api/help-requests/10/comments/11").expect(200);
        expect(comment).toMatchObject({
            id: 11,
            author_id: 8,
            help_request_id: 10,
            parent_id: 2,
            created_at: "2024-05-21T16:31:45.336Z",
            description: "Another reply to the second comment in this thread.",
        });
    }));
    test("404 - GET: responds with an error if help request is not found", () => __awaiter(void 0, void 0, void 0, function* () {
        const { body: { error }, } = yield (0, supertest_1.default)(app_1.default)
            .get("/api/help-requests/999/comments/11")
            .expect(404);
        expect(error).toMatchObject({
            message: "Help request was not found",
        });
    }));
    test("404 - GET: responds with an error if comment is not found", () => __awaiter(void 0, void 0, void 0, function* () {
        const { body: { error }, } = yield (0, supertest_1.default)(app_1.default)
            .get("/api/help-requests/10/comments/999")
            .expect(404);
        expect(error).toMatchObject({
            message: "Comment was not found",
        });
    }));
    test("400 - GET: responds with an error if help_request_id is invalid", () => __awaiter(void 0, void 0, void 0, function* () {
        const { body: { error }, } = yield (0, supertest_1.default)(app_1.default)
            .get("/api/help-requests/invalid/comments/11")
            .expect(400);
        expect(error).toMatchObject({
            message: "Invalid help request id provided",
        });
    }));
    test("400 - GET: responds with an error if comment_id is invalid", () => __awaiter(void 0, void 0, void 0, function* () {
        const { body: { error }, } = yield (0, supertest_1.default)(app_1.default)
            .get("/api/help-requests/10/comments/invalid")
            .expect(400);
        expect(error).toMatchObject({
            message: "Invalid comment id provided",
        });
    }));
});
describe("updateComment", () => {
    test("PATCH - 200: Updates and returns a comment", () => __awaiter(void 0, void 0, void 0, function* () {
        const commentBody = {
            description: "I've updated this comment",
        };
        const { body: { updatedComment }, } = yield (0, supertest_1.default)(app_1.default)
            .patch("/api/help-requests/10/comments/11")
            .set("X-User-ID", "8")
            .send(commentBody)
            .expect(200);
        expect(updatedComment).toMatchObject({
            id: 11,
            author_id: 8,
            help_request_id: 10,
            parent_id: 2,
            created_at: expect.any(String),
            description: "I've updated this comment",
        });
    }));
    test("PATCH - 404: Comment not found", () => __awaiter(void 0, void 0, void 0, function* () {
        const commentBody = {
            description: "This comment does not exist",
        };
        const { body: { error }, } = yield (0, supertest_1.default)(app_1.default)
            .patch("/api/help-requests/10/comments/999")
            .set("X-User-ID", "8")
            .send(commentBody)
            .expect(404);
        expect(error).toMatchObject({ message: "Comment was not found" });
    }));
    test("PATCH - 400: Invalid comment body", () => __awaiter(void 0, void 0, void 0, function* () {
        const commentBody = {
            description: "",
        };
        const { body: { error }, } = yield (0, supertest_1.default)(app_1.default)
            .patch("/api/help-requests/10/comments/11")
            .set("X-User-ID", "8")
            .send(commentBody)
            .expect(400);
        expect(error).toMatchObject({
            message: "You need to fill in the mandatory field",
        });
    }));
    test("PATCH - 401: User unauthorized to update comment", () => __awaiter(void 0, void 0, void 0, function* () {
        const commentBody = {
            description: "Unauthorized user attempt to update this comment",
        };
        const { body: { error }, } = yield (0, supertest_1.default)(app_1.default)
            .patch("/api/help-requests/10/comments/11")
            .set("X-User-ID", "999")
            .send(commentBody)
            .expect(401);
        expect(error).toMatchObject({
            message: "You are not authorised to update this comment",
        });
    }));
    test("PATCH - 400: Invalid help request", () => __awaiter(void 0, void 0, void 0, function* () {
        const commentBody = {
            description: "I've updated this comment",
        };
        const { body: { error }, } = yield (0, supertest_1.default)(app_1.default)
            .patch("/api/help-requests/invalid_id/comments/12")
            .set("X-User-ID", "8")
            .send(commentBody)
            .expect(400);
        expect(error).toMatchObject({
            message: "Invalid help request id provided",
        });
    }));
    test("PATCH - 400: Invalid comment ID", () => __awaiter(void 0, void 0, void 0, function* () {
        const commentBody = {
            description: "I've updated this comment",
        };
        const { body: { error }, } = yield (0, supertest_1.default)(app_1.default)
            .patch("/api/help-requests/10/comments/invalid")
            .set("X-User-ID", "8")
            .send(commentBody)
            .expect(400);
        expect(error).toMatchObject({ message: "Invalid comment id provided" });
    }));
});
describe("removeComment", () => {
    test("DELETE - 204: Deletes a comment based upond comment_id", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.default)
            .delete("/api/help-requests/10/comments/11")
            .set("X-User-ID", "8")
            .expect(204);
    }));
    test("404 - DELETE returns not found if help request does not exist", () => __awaiter(void 0, void 0, void 0, function* () {
        const { body: { error: { message }, }, } = yield (0, supertest_1.default)(app_1.default)
            .delete("/api/help-requests/999/comments/11")
            .set("X-User-ID", "8")
            .expect(404);
        expect(message).toBe("Help request was not found");
    }));
    test("401 - DELETE returns unauthorised if user is not authorized", () => __awaiter(void 0, void 0, void 0, function* () {
        const { body: { error: { message }, }, } = yield (0, supertest_1.default)(app_1.default)
            .delete("/api/help-requests/10/comments/11")
            .set("X-User-ID", "2")
            .expect(401);
        expect(message).toBe("You are not authorised to delete this comment");
    }));
    test("400 - DELETE returns bad request if help_request_id is invalid", () => __awaiter(void 0, void 0, void 0, function* () {
        const { body: { error: { message }, }, } = yield (0, supertest_1.default)(app_1.default)
            .delete("/api/help-requests/invalid/comments/10")
            .set("X-User-ID", "1")
            .expect(400);
        expect(message).toBe("Invalid help request id provided");
    }));
    test("400 - DELETE returns bad request if comment id is invalid", () => __awaiter(void 0, void 0, void 0, function* () {
        const { body: { error: { message }, }, } = yield (0, supertest_1.default)(app_1.default)
            .delete("/api/help-requests/10/comments/invalid")
            .set("X-User-ID", "1")
            .expect(400);
        expect(message).toBe("Invalid comment id provided");
    }));
});
