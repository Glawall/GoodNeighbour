import request from "supertest";
import app from "../../app/app";
import db from "../../app/connection";
import { testData } from "../../app/db/seeds/data/test";
import { usersData } from "../../app/db/seeds/data/test/users";
import seed from "../../app/db/seeds/seed";

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

describe("POST /api/auth/login", () => {
  test("200 - POST: Successfully logs in with valid credentials", async () => {
    const loginBody = {
      email: usersData[0].email,
      password: "password123",
    };

    const { body } = await request(app)
      .post("/api/auth/login")
      .send(loginBody)
      .expect(200);

    expect(body).toMatchObject({
      token: expect.any(String),
      user: {
        id: expect.any(Number),
        email: usersData[0].email,
        first_name: usersData[0].first_name,
        last_name: usersData[0].last_name,
      },
    });
  });

  test("401 - POST: Returns error with invalid password", async () => {
    const loginBody = {
      email: usersData[0].email,
      password: "wrongpassword",
    };

    const {
      body: { error },
    } = await request(app).post("/api/auth/login").send(loginBody).expect(401);

    expect(error).toMatchObject({
      message: "User is not authorised",
    });
  });

  test("401 - POST: Returns error with non-existent email", async () => {
    const loginBody = {
      email: "nonexistent@example.com",
      password: "password123",
    };

    const {
      body: { error },
    } = await request(app).post("/api/auth/login").send(loginBody).expect(401);

    expect(error).toMatchObject({
      message: "User is not authorised",
    });
  });

  test("400 - POST: Returns error when email is missing", async () => {
    const loginBody = {
      password: "password123",
    };

    const {
      body: { error },
    } = await request(app).post("/api/auth/login").send(loginBody).expect(400);

    expect(error).toMatchObject({
      message: "You need to fill in the mandatory field",
    });
  });

  test("400 - POST: Returns error when password is missing", async () => {
    const loginBody = {
      email: usersData[0].email,
    };

    const {
      body: { error },
    } = await request(app).post("/api/auth/login").send(loginBody).expect(400);

    expect(error).toMatchObject({
      message: "You need to fill in the mandatory field",
    });
  });
});
