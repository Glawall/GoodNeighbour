import request from "supertest";
import app from "../../app/app";
import db from "../../app/connection";
import { testData } from "../../app/db/seeds/data/test";
import seed from "../../app/db/seeds/seed";
import "jest-sorted";
import {
  HelpRequest,
  HelpRequestBody,
} from "../../app/db/seeds/data/test/help-requests";
import { getByUserId } from "../../app/services/helpRequests/getByUserId";

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

describe("getAllHelpRequests", () => {
  test("200 - GET: responds with an array of help request objects with the appropriate properties", async () => {
    const {
      body: { helpRequests },
    } = await request(app).get("/api/help-requests").expect(200);
    helpRequests.forEach((helpRequest: HelpRequest[]) => {
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
      expect(helpRequest).toHaveProperty("help_type");
    });
  });
  test("200 - GET: responds with help requests sorted by 'created_at' by default", async () => {
    const {
      body: { helpRequests },
    } = await request(app).get("/api/help-requests").expect(200);
    expect(helpRequests).toBeSortedBy("created_at", { descending: true });
  });
  test("200 - GET: responds with help requests sorted by 'created_at' ascending", async () => {
    const {
      body: { helpRequests },
    } = await request(app).get("/api/help-requests?order=asc").expect(200);
    expect(helpRequests).toBeSortedBy("created_at", { descending: false });
  });
  test("200 - GET: responds with help requests sorted by 'author_username' in descending order", async () => {
    const {
      body: { helpRequests },
    } = await request(app)
      .get("/api/help-requests?sort_by=author_username&order=desc")
      .expect(200);
    expect(helpRequests).toBeSortedBy("author_username", { descending: true });
  });
  test("200 - GET: responds with help requests sorted by 'author_username' in ascending order", async () => {
    const {
      body: { helpRequests },
    } = await request(app)
      .get(
        "/api/help-requests?sort_by=author_username&order=asc&help_type=Shopping"
      )
      .expect(200);
    expect(helpRequests).toBeSortedBy("author_username", { descending: false });
    helpRequests.forEach((helpRequest: HelpRequest) => {
      expect(helpRequest.help_type).toBe("Shopping");
    });
  });
  test("400 - GET: responds with error for invalid input parameters", async () => {
    const invalidQueries = [
      "/api/help-requests?sort_by=12",
      "/api/help-requests?order=12",
    ];

    for (const query of invalidQueries) {
      const {
        body: { error },
      } = await request(app).get(query).expect(400);
      expect(error).toMatchObject({ message: "Invalid input provided" });
    }
  });
  test("200 - GET: responds with an empty array for invalid help_type", async () => {
    const {
      body: { helpRequests },
    } = await request(app).get("/api/help-requests?help_type=12").expect(200);
    expect(helpRequests).toEqual([]);
  });
});

describe("getByHelpRequestId", () => {
  test("200 - GET: responds with an a help request object, based on help_request_id", async () => {
    const {
      body: { helpRequest },
    } = await request(app).get("/api/help-requests/1").expect(200);
    expect(helpRequest.request).toMatchObject({
      id: 1,
      title: "Need help with grocery shopping",
      author_id: 1,
      description:
        "I need someone to help me with my weekly grocery shopping this Monday",
      created_at: "2024-05-21T12:34:56.789Z",
      req_date: "2024-05-27T10:00:00.000Z",
      status: "active",
      help_type_id: 1,
      name: "Shopping",
    });
  });
  test("404 - GET: responds with an error if help request is not found", async () => {
    const {
      body: { error },
    } = await request(app).get("/api/help-requests/999").expect(404);
    expect(error).toMatchObject({
      message: "Help request was not found",
    });
  });
  test("400 - GET: responds with an error if help_request_id is invalid", async () => {
    const {
      body: { error },
    } = await request(app).get("/api/help-requests/invalid_id").expect(400);
    expect(error).toMatchObject({
      message: "Invalid help request id provided",
    });
  });
});

describe.only("getByUserId", () => {
  test("200 - GET: responds with an array of help-request objects with offers and helper info", async () => {
    const {
      body: { helpRequests },
    } = await request(app).get("/api/users/1/help-requests").expect(200);

    helpRequests.forEach((helpRequest: HelpRequest) => {
      expect(helpRequest).toHaveProperty("id");
      expect(helpRequest).toHaveProperty("title");
      expect(helpRequest.author_id).toBe(1);
      expect(helpRequest).toHaveProperty("help_type_id");
      expect(helpRequest).toHaveProperty("description");
      expect(helpRequest).toHaveProperty("created_at");
      expect(helpRequest).toHaveProperty("req_date");
      expect(helpRequest).toHaveProperty("status");
      expect(helpRequest).toHaveProperty("help_request_id");
      expect(helpRequest).toHaveProperty("offer_status");
      expect(helpRequest).toHaveProperty("offer_created_at");
      expect(helpRequest).toHaveProperty("helper_id");
      expect(helpRequest).toHaveProperty("helper_username");
      expect(helpRequest).toHaveProperty("helper_email");
      expect(helpRequest).toHaveProperty("helper_avatar_url");
    });
  });

  test("404 - GET: responds with an error when the user does not exist", async () => {
    const {
      body: { error },
    } = await request(app).get("/api/users/9999/help-requests").expect(404);
    expect(error).toMatchObject({ message: "User was not found" });
  });

  test("400 - GET: responds with an error when the user_id is not a valid number", async () => {
    const {
      body: { error },
    } = await request(app).get("/api/users/invalid/help-requests").expect(400);
    expect(error).toMatchObject({ message: "Invalid user id provided" });
  });
});

describe("createHelpRequest", () => {
  test("204 - POST: responds with a newly created user", async () => {
    const helpRequestBody: Partial<HelpRequestBody> = {
      title: "Help with my prescription collection",
      help_type: "Shopping",
      description: "Would someone be able to go collect my prescription",
      req_date: "2024-05-27T10:00:00.000Z",
    };
    const {
      body: { newHelpRequest },
    } = await request(app)
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
  });
  test("400 - POST: responds with an error if parameters are missing", async () => {
    const helpRequestBody = {
      title: "Help with my prescription collection",
      help_type: "Shopping",
      description: "Would someone be able to go collect my prescription",
    };
    const {
      body: { error },
    } = await request(app)
      .post("/api/help-requests")
      .set("X-User-ID", "1")
      .send(helpRequestBody)
      .expect(400);
    expect(error).toEqual({
      message: "You need to fill in the mandatory field",
    });
  });
  test("400 - POST: responds with an error if user ID is invalid", async () => {
    const helpRequestBody: Partial<HelpRequestBody> = {
      title: "Help with my prescription collection",
      help_type: "Shopping",
      description: "Would someone be able to go collect my prescription",
      req_date: "2024-05-27T10:00:00.000Z",
    };

    const {
      body: { error },
    } = await request(app)
      .post("/api/help-requests")
      .set("X-User-ID", "invalid-id")
      .send(helpRequestBody)
      .expect(400);
    expect(error).toEqual({
      message: "Invalid user id provided",
    });
  });
  test("400 - POST: responds with an error if user ID is invalid", async () => {
    const helpRequestBody: Partial<HelpRequestBody> = {
      title: "Help with my prescription collection",
      help_type: "Shopping",
      description: "Would someone be able to go collect my prescription",
      req_date: "2024-05-27T10:00:00.000Z",
    };

    const {
      body: { error },
    } = await request(app)
      .post("/api/help-requests")
      .set("X-User-ID", "invalid-id")
      .send(helpRequestBody)
      .expect(400);
    expect(error).toEqual({
      message: "Invalid user id provided",
    });
  });
});

describe("updateHelpRequest", () => {
  test("200 PATCH: responds with an updated help request", async () => {
    const helpRequestBody: Partial<HelpRequestBody> = {
      title: "Help with my prescription collection",
      help_type: "Shopping",
      description: "Would someone be able to go collect my prescription",
      req_date: "2024-05-27T10:00:00.000Z",
    };
    const {
      body: { updatedHelpRequest },
    } = await request(app)
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
  });
  test("404 - PATCH: responds with a not found error when help request does not exist", async () => {
    const helpRequestBody: Partial<HelpRequestBody> = {
      title: "Help with my prescription collection",
    };

    const {
      body: { error },
    } = await request(app)
      .patch("/api/help-requests/999")
      .set("X-User-ID", "1")
      .send(helpRequestBody)
      .expect(404);

    expect(error).toEqual({ message: "Help request was not found" });
  });
  test("404 - PATCH: responds with a not found error when help request does not exist", async () => {
    const helpRequestBody: Partial<HelpRequestBody> = {
      title: "Help with my prescription collection",
    };

    const {
      body: { error },
    } = await request(app)
      .patch("/api/help-requests/invalid")
      .set("X-User-ID", "1")
      .send(helpRequestBody)
      .expect(400);

    expect(error).toEqual({ message: "Invalid help request id provided" });
  });

  test("403 - PATCH: responds with an authorization error when user is not allowed to update", async () => {
    const helpRequestBody: Partial<HelpRequestBody> = {
      title: "Attempt to update without permission",
    };

    const {
      body: { error },
    } = await request(app)
      .patch("/api/help-requests/1")
      .set("X-User-ID", "2")
      .send(helpRequestBody)
      .expect(401);

    expect(error).toEqual({
      message: "You are not authorised to update this help request",
    });
  });
});

describe("removeHelpRequest", () => {
  test("204 - DELETE removes a help request and respodns with a 204", async () => {
    await request(app)
      .delete("/api/help-requests/1")
      .set("X-User-ID", "1")
      .expect(204);
  });
  test("404 - DELETE returns not found if help offer does not exist", async () => {
    const {
      body: {
        error: { message },
      },
    } = await request(app)
      .delete("/api/help-requests/999/")
      .set("X-User-ID", "1")
      .expect(404);
    expect(message).toBe("Help request was not found");
  });

  test("401 - DELETE returns unauthorised if user is not authorized", async () => {
    const {
      body: {
        error: { message },
      },
    } = await request(app)
      .delete("/api/help-requests/1")
      .set("X-User-ID", "2")
      .expect(401);
    expect(message).toBe("You are not authorised to delete this help request");
  });

  test("400 - DELETE returns bad request if parameters are invalid", async () => {
    const {
      body: {
        error: { message },
      },
    } = await request(app)
      .delete("/api/help-requests/invalid")
      .set("X-User-ID", "1")
      .expect(400);
    expect(message).toBe("Invalid help request id provided");
  });
});
