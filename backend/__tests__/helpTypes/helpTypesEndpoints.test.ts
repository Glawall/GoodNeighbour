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
