import request from "supertest";
import app from "../../app/app";
import db from "../../app/connection";
import { testData } from "../../app/db/seeds/data/test";
import seed from "../../app/db/seeds/seed";
import { Comment, NewCommentBody } from "../../app/db/seeds/data/test/comments";

beforeEach(async () => {
  await db.query("BEGIN");
  await seed(testData);
});

afterEach(async () => {
  await db.query("ROLLBACK");
});

afterAll(async () => {
  await db.end();
});

describe("getCommentsByRequestId", () => {
  test("200 - GET: responds with a structured array of comments including threads", async () => {
    const {
      body: { comments },
    } = await request(app).get("/api/help-requests/10/comments").expect(200);
    expect(Array.isArray(comments)).toBe(true);
    comments.forEach((comment: Comment & { replies: Comment[] }) => {
      expect(comment).toHaveProperty("id");
      expect(comment).toHaveProperty("author_address");
      expect(comment).toHaveProperty("author_postcode");
      expect(comment).toHaveProperty("author_first_name");
      expect(comment).toHaveProperty("author_last_name");
      expect(comment).toHaveProperty("author_latitude");
      expect(comment).toHaveProperty("author_longitude");
      expect(comment).toHaveProperty("author_phone_number");
      expect(comment).toHaveProperty("parent_id");
      expect(comment).toHaveProperty("created_at");
      expect(comment).toHaveProperty("description");
      expect(comment).toHaveProperty("replies");
      expect(Array.isArray(comment.replies)).toBe(true);
    });
    expect(comments[0].replies[0]).toMatchObject({
      id: 10,
      author_first_name: "Emily",
      author_last_name: "Thompson",
      author_postcode: "W2 4QJ",
      author_address: "9 Queensway, London",
      author_longitude: -0.1882,
      author_latitude: 51.5108,
      author_phone_number: "07789 456123",
      parent_id: 8,
      created_at: expect.any(String),
      description: "This is a reply to the comment with parent_id 8.",
      replies: [],
    });
  });
  test("200 - GET: responds with an empty array of comments if not comments are attached to the helpRequest", async () => {
    const {
      body: { comments },
    } = await request(app).get("/api/help-requests/11/comments").expect(200);
    expect(Array.isArray(comments)).toBe(true);
    expect(comments).toEqual([]);
  });
  test("404 - GET: responds with an error if the help request does not exist", async () => {
    const {
      body: { error },
    } = await request(app).get("/api/help-requests/999/comments").expect(404);
    expect(error).toEqual({
      message: "Help request was not found",
    });
  });

  test("400 - GET: responds with an error for invalid help_request_id", async () => {
    const {
      body: { error },
    } = await request(app)
      .get("/api/help-requests/invalid/comments")
      .expect(400);
    expect(error).toEqual({
      message: "Invalid help request id provided",
    });
  });
});

describe("createComment", () => {
  test("POST - 204: When given a comment body, posts comment and returns it", async () => {
    const commentBody: Partial<NewCommentBody> = {
      description: "New comment here",
    };
    const {
      body: { newCommentBody },
    } = await request(app)
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
  });
  test("POST - 400: Returns an error when description is missing", async () => {
    const commentBody: Partial<NewCommentBody> = {};
    const {
      body: { error },
    } = await request(app)
      .post("/api/help-requests/10/comments/8")
      .set("X-User-ID", "1")
      .send(commentBody)
      .expect(400);

    expect(error).toMatchObject({
      message: "You need to fill in the mandatory field",
    });
  });

  test("POST - 404: Returns an error for invalid help_request_id", async () => {
    const commentBody: Partial<NewCommentBody> = {
      description: "New comment here",
    };

    const {
      body: { error },
    } = await request(app)
      .post("/api/help-requests/999/comments/8")
      .set("X-User-ID", "1")
      .send(commentBody)
      .expect(404);

    expect(error).toMatchObject({
      message: "Help request was not found",
    });
  });
  test("POST - 404: Returns an error for invalid parent id", async () => {
    const commentBody: Partial<NewCommentBody> = {
      description: "New comment here",
    };

    const {
      body: { error },
    } = await request(app)
      .post("/api/help-requests/10/comments/invalid")
      .set("X-User-ID", "1")
      .send(commentBody)
      .expect(400);

    expect(error).toMatchObject({
      message: "Invalid input provided",
    });
  });
  test("POST - 404: Returns an error for invalid help_request_id", async () => {
    const commentBody: Partial<NewCommentBody> = {
      description: "New comment here",
    };

    const {
      body: { error },
    } = await request(app)
      .post("/api/help-requests/invalid/comments/10")
      .set("X-User-ID", "1")
      .send(commentBody)
      .expect(400);
    expect(error).toMatchObject({
      message: "Invalid help request id provided",
    });
  });

  test("POST - 404: Returns an error for if comment_id does not exist", async () => {
    const commentBody: Partial<NewCommentBody> = {
      description: "New comment here",
    };
    const {
      body: { error },
    } = await request(app)
      .post("/api/help-requests/10/comments/999")
      .set("X-User-ID", "1")
      .send(commentBody)
      .expect(404);

    expect(error).toMatchObject({
      message: "Comment was not found",
    });
  });

  test("POST - 401: Returns an error when user ID is missing", async () => {
    const commentBody: Partial<NewCommentBody> = {
      description: "New comment here",
    };

    const {
      body: { error },
    } = await request(app)
      .post("/api/help-requests/10/comments/8")
      .send(commentBody)
      .expect(401);

    expect(error).toMatchObject({
      message: "User is not authorised",
    });
  });
});

describe("getCommentByID", () => {
  test("200 - GET: responds with an a comment object, based on comment_id", async () => {
    const {
      body: { comment },
    } = await request(app).get("/api/help-requests/10/comments/11").expect(200);
    expect(comment).toMatchObject({
      id: 11,
      author_id: 8,
      help_request_id: 10,
      parent_id: 2,
      created_at: "2024-05-21T16:31:45.336Z",
      description: "Another reply to the second comment in this thread.",
    });
  });
  test("404 - GET: responds with an error if help request is not found", async () => {
    const {
      body: { error },
    } = await request(app)
      .get("/api/help-requests/999/comments/11")
      .expect(404);
    expect(error).toMatchObject({
      message: "Help request was not found",
    });
  });
  test("404 - GET: responds with an error if comment is not found", async () => {
    const {
      body: { error },
    } = await request(app)
      .get("/api/help-requests/10/comments/999")
      .expect(404);
    expect(error).toMatchObject({
      message: "Comment was not found",
    });
  });
  test("400 - GET: responds with an error if help_request_id is invalid", async () => {
    const {
      body: { error },
    } = await request(app)
      .get("/api/help-requests/invalid/comments/11")
      .expect(400);
    expect(error).toMatchObject({
      message: "Invalid help request id provided",
    });
  });
  test("400 - GET: responds with an error if comment_id is invalid", async () => {
    const {
      body: { error },
    } = await request(app)
      .get("/api/help-requests/10/comments/invalid")
      .expect(400);
    expect(error).toMatchObject({
      message: "Invalid comment id provided",
    });
  });
});

describe("updateComment", () => {
  test("PATCH - 200: Updates and returns a comment", async () => {
    const commentBody: Partial<NewCommentBody> = {
      description: "I've updated this comment",
    };
    const {
      body: { updatedComment },
    } = await request(app)
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
  });
  test("PATCH - 404: Comment not found", async () => {
    const commentBody: Partial<NewCommentBody> = {
      description: "This comment does not exist",
    };
    const {
      body: { error },
    } = await request(app)
      .patch("/api/help-requests/10/comments/999")
      .set("X-User-ID", "8")
      .send(commentBody)
      .expect(404);
    expect(error).toMatchObject({ message: "Comment was not found" });
  });

  test("PATCH - 400: Invalid comment body", async () => {
    const commentBody = {
      description: "",
    };
    const {
      body: { error },
    } = await request(app)
      .patch("/api/help-requests/10/comments/11")
      .set("X-User-ID", "8")
      .send(commentBody)
      .expect(400);
    expect(error).toMatchObject({
      message: "You need to fill in the mandatory field",
    });
  });

  test("PATCH - 401: User unauthorized to update comment", async () => {
    const commentBody: Partial<NewCommentBody> = {
      description: "Unauthorized user attempt to update this comment",
    };
    const {
      body: { error },
    } = await request(app)
      .patch("/api/help-requests/10/comments/11")
      .set("X-User-ID", "999")
      .send(commentBody)
      .expect(401);
    expect(error).toMatchObject({
      message: "You are not authorised to update this comment",
    });
  });

  test("PATCH - 400: Invalid help request", async () => {
    const commentBody: Partial<NewCommentBody> = {
      description: "I've updated this comment",
    };
    const {
      body: { error },
    } = await request(app)
      .patch("/api/help-requests/invalid_id/comments/12")
      .set("X-User-ID", "8")
      .send(commentBody)
      .expect(400);
    expect(error).toMatchObject({
      message: "Invalid help request id provided",
    });
  });
  test("PATCH - 400: Invalid comment ID", async () => {
    const commentBody: Partial<NewCommentBody> = {
      description: "I've updated this comment",
    };
    const {
      body: { error },
    } = await request(app)
      .patch("/api/help-requests/10/comments/invalid")
      .set("X-User-ID", "8")
      .send(commentBody)
      .expect(400);
    expect(error).toMatchObject({ message: "Invalid comment id provided" });
  });
});

describe("removeComment", () => {
  test("DELETE - 204: Deletes a comment based upond comment_id", async () => {
    await request(app)
      .delete("/api/help-requests/10/comments/11")
      .set("X-User-ID", "8")
      .expect(204);
  });
  test("404 - DELETE returns not found if help request does not exist", async () => {
    const {
      body: {
        error: { message },
      },
    } = await request(app)
      .delete("/api/help-requests/999/comments/11")
      .set("X-User-ID", "8")
      .expect(404);
    expect(message).toBe("Help request was not found");
  });

  test("401 - DELETE returns unauthorised if user is not authorized", async () => {
    const {
      body: {
        error: { message },
      },
    } = await request(app)
      .delete("/api/help-requests/10/comments/11")
      .set("X-User-ID", "2")
      .expect(401);
    expect(message).toBe("You are not authorised to delete this comment");
  });

  test("400 - DELETE returns bad request if help_request_id is invalid", async () => {
    const {
      body: {
        error: { message },
      },
    } = await request(app)
      .delete("/api/help-requests/invalid/comments/10")
      .set("X-User-ID", "1")
      .expect(400);

    expect(message).toBe("Invalid help request id provided");
  });
  test("400 - DELETE returns bad request if comment id is invalid", async () => {
    const {
      body: {
        error: { message },
      },
    } = await request(app)
      .delete("/api/help-requests/10/comments/invalid")
      .set("X-User-ID", "1")
      .expect(400);

    expect(message).toBe("Invalid comment id provided");
  });
});
