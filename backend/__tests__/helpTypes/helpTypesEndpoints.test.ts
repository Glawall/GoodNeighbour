import request from "supertest";
import app from "../../app/app";
import db from "../../app/connection";
import { testData } from "../../app/db/seeds/data/test";
import seed from "../../app/db/seeds/seed";
import { HelpType } from "../../app/db/seeds/data/test/help-types";

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
      body: { helpTypes },
    } = await request(app).get("/api/help-types").expect(200);
    helpTypes.forEach((helpType: HelpType[]) => {
      expect(helpType).toHaveProperty("name");
      expect(helpType).toHaveProperty("description");
    });
  });
});

describe("getByHelpRequestId", () => {
  test("200 - GET: responds with an a help request object, based on help_request_id", async () => {
    const {
      body: { helpType },
    } = await request(app).get("/api/help-types/1").expect(200);
    expect(helpType).toMatchObject({
      id: 1,
      name: "Shopping",
      description:
        "Turpis toties tres. Toties vacuus inventore laborum. Pauci ea aestas.",
    });
  });
  test("404 - GET: responds with an error if help request is not found", async () => {
    const {
      body: { error },
    } = await request(app).get("/api/help-types/999").expect(404);
    expect(error).toMatchObject({
      message: "Help type was not found",
    });
  });
  test("400 - GET: responds with an error if help_request_id is invalid", async () => {
    const {
      body: { error },
    } = await request(app).get("/api/help-types/invalid_id").expect(400);
    expect(error).toMatchObject({
      message: "Invalid help type id provided",
    });
  });
});
