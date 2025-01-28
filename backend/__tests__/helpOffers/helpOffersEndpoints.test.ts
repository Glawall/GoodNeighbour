import request from "supertest";
import app from "../../app/app";
import db from "../../app/connection";
import { testData } from "../../app/db/seeds/data/test";
import seed from "../../app/db/seeds/seed";
import { HelpOffer } from "../../app/db/seeds/data/test/help-offers";

beforeEach(async () => {
  try {
    await db.query("BEGIN");
    await seed(testData);
  } catch (error) {
    console.error("Error in test setup:", error);
    throw error;
  }
});

afterEach(async () => {
  await db.query("ROLLBACK");
});

afterAll(async () => {
  await db.end();
});

describe("getByHelpRequestId", () => {
  test("200 - GET: Responds with an array of help offer objects that have the help_request_id", async () => {
    const {
      body: { helpOffers },
    } = await request(app).get("/api/help-requests/9/help-offers").expect(200);
    helpOffers.forEach((offer: HelpOffer) => {
      expect(offer).toHaveProperty("user_id");
      expect(offer).toHaveProperty("first_name");
      expect(offer).toHaveProperty("address");
      expect(offer).toHaveProperty("email");
      expect(offer).toHaveProperty("phone_number");
      expect(offer.help_request_id).toBe(9);
      expect(offer).toHaveProperty("status");
    });
  });
  test("404 - GET: Responds with appropriate error when invalid help_request_id provided", async () => {
    const {
      body: {
        error: { message },
      },
    } = await request(app)
      .get("/api/help-requests/gfrf/help-offers")
      .expect(400);
    expect(message).toBe("Invalid help request id provided");
  });
  test("404 - GET: Responds with error when help request does not exist", async () => {
    const {
      body: {
        error: { message },
      },
    } = await request(app)
      .get("/api/help-requests/999/help-offers")
      .expect(404);
    expect(message).toBe("Help request was not found");
  });
});

describe("createHelpOffer", () => {
  test("201 - POST: Responds with a newly created help offer", async () => {
    const helpOfferBody = {
      help_request_id: 7,
      status: "active",
    };
    const {
      body: { newHelpOffer },
    } = await request(app)
      .post("/api/users/9/help-offers")
      .send(helpOfferBody)
      .set("X-User-ID", "9")
      .expect(201);
    expect(newHelpOffer).toMatchObject({
      helper_id: 9,
      help_request_id: 7,
      status: "active",
    });
  });
  test("400 - POST: Responds with appropriate error when invalid user_id provided", async () => {
    const helpOfferBody = {
      help_request_id: 2,
      status: "active",
    };
    const {
      body: {
        error: { message },
      },
    } = await request(app)
      .post("/api/users/gthty/help-offers")
      .send(helpOfferBody)
      .expect(400);
    expect(message).toBe("Invalid user id provided");
  });
  test("400 - POST: Responds with appropriate error when user_id does not match authorization id", async () => {
    const helpOfferBody = {
      help_request_id: 2,
      status: "active",
    };
    const {
      body: {
        error: { message },
      },
    } = await request(app)
      .post("/api/users/1/help-offers")
      .set("X-User-ID", "9")
      .send(helpOfferBody)
      .expect(401);
    expect(message).toBe("User is not authorised");
  });
  test("400 - POST: Responds with appropriate error when invalid body fields provided", async () => {
    const helpOfferBody = {
      status: "active",
    };
    const {
      body: {
        error: { message },
      },
    } = await request(app)
      .post("/api/users/5/help-offers")
      .send(helpOfferBody)
      .expect(400);
    expect(message).toBe("Invalid input provided");
  });
  test("400 - POST: Responds with appropriate error when nonexistent user_id provided", async () => {
    const helpOfferBody = {
      help_request_id: 2,
      status: "active",
    };
    const {
      body: {
        error: { message },
      },
    } = await request(app)
      .post("/api/users/25/help-offers")
      .send(helpOfferBody)
      .set("X-User-ID", "25")
      .expect(400);
    expect(message).toBe("User was not found");
  });
});

describe("getByUserId", () => {
  test("200 - GET: Responds with an array of objects that have request, requester, offer objects with the appropriate properties", async () => {
    const {
      body: { userHelpOffers },
    } = await request(app)
      .get("/api/users/7/help-offers")
      .set("X-User-ID", "7")
      .expect(200);
    userHelpOffers.forEach((offer: any) => {
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
      offer.offers.forEach((off: any) => {
        expect(typeof off.helper.id).toBe("number");
        expect(typeof off.helper.first_name).toBe("string");
        expect(typeof off.helper.last_name).toBe("string");
      });
    });
  });
  test("404 - GET: Responds with appropriate error when invalid user id provided", async () => {
    const {
      body: {
        error: { message },
      },
    } = await request(app).get("/api/users/gfrf/help-offers").expect(400);
    expect(message).toBe("Invalid user id provided");
  });
  test("401 - GET: Responds when user id does not match authorisation id", async () => {
    const {
      body: {
        error: { message },
      },
    } = await request(app).get("/api/users/999/help-offers").expect(401);
    expect(message).toBe("User is not authorised");
  });
  test("404 - GET: Responds with appropriate error when nonexistent user_id provided", async () => {
    const {
      body: {
        error: { message },
      },
    } = await request(app)
      .get("/api/users/500/help-offers")
      .set("X-User-ID", "500")
      .expect(404);
    expect(message).toBe("User was not found");
  });
});

describe("getByHelperIdAndHelpRequestId", () => {
  test("200 - GET: Responds with an offer object with the correct properties", async () => {
    const {
      body: { helpOffer },
    } = await request(app)
      .get("/api/help-requests/1/help-offers/2")
      .set("X-User-ID", "2")
      .expect(200);
    expect(helpOffer).toMatchObject({
      helper_id: 2,
      help_request_id: 1,
      status: "active",
    });
  });
  test("404 - GET: Responds with appropriate error when help request id provided", async () => {
    const {
      body: {
        error: { message },
      },
    } = await request(app)
      .get("/api/help-requests/gfrf/help-offers/1")
      .set("X-User-ID", "1")
      .expect(400);
    expect(message).toBe("Invalid help request id provided");
  });
  test("404 - GET: Responds with appropriate error when given non-existent help request id", async () => {
    const {
      body: {
        error: { message },
      },
    } = await request(app)
      .get("/api/help-requests/999/help-offers/3")
      .set("X-User-ID", "3")
      .expect(404);
    expect(message).toBe("Help request was not found");
  });
  test("401 - GET: Responds when user id does not match authorisation id", async () => {
    const {
      body: {
        error: { message },
      },
    } = await request(app)
      .get("/api/help-requests/1/help-offers/5")
      .set("X-User-ID", "9")
      .expect(401);
    expect(message).toBe("User is not authorised");
  });
  test("404 - GET: Responds with appropriate error when nonexistent user_id provided", async () => {
    const {
      body: {
        error: { message },
      },
    } = await request(app)
      .get("/api/help-requests/1/help-offers/500")
      .set("X-User-ID", "500")
      .expect(404);
    expect(message).toBe("User was not found");
  });
  test("404 - GET: Responds with appropriate error when help offer not found", async () => {
    const {
      body: {
        error: { message },
      },
    } = await request(app)
      .get("/api/help-requests/7/help-offers/1")
      .set("X-User-ID", "1")
      .expect(404);
    expect(message).toBe("Help offer was not found");
  });
});

describe("removeHelpOffer", () => {
  test("204 - DELETE removes a help offer and responds with a 204", async () => {
    await request(app)
      .delete("/api/help-requests/1/help-offers/2")
      .set("X-User-ID", "2")
      .expect(204);
  });
  test("404 - DELETE returns not found if user does not exist", async () => {
    const {
      body: {
        error: { message },
      },
    } = await request(app)
      .delete("/api/help-requests/1/help-offers/999")
      .set("X-User-ID", "1")
      .expect(404);
    expect(message).toBe("User was not found");
  });
  test("404 - DELETE returns not found if user does not exist", async () => {
    const {
      body: {
        error: { message },
      },
    } = await request(app)
      .delete("/api/help-requests/1/help-offers/999")
      .set("X-User-ID", "999")
      .expect(404);
    expect(message).toBe("User was not found");
  });
  test("401 - DELETE returns not found if help offer does not exist", async () => {
    const {
      body: {
        error: { message },
      },
    } = await request(app)
      .delete("/api/help-requests/1/help-offers/1")
      .set("X-User-ID", "1")
      .expect(404);
    expect(message).toBe("Help offer was not found");
  });

  test("400 - DELETE returns bad request if help request id is invalid", async () => {
    const {
      body: {
        error: { message },
      },
    } = await request(app)
      .delete("/api/help-requests/invalid/help-offers/8")
      .set("X-User-ID", "1")
      .expect(400);
    expect(message).toBe("Invalid help request id provided");
  });
});

describe("updateHelpOffer", () => {
  test("200 - PATCH: Responds with an updated help offer status,", async () => {
    const helpOfferBody: Partial<HelpOffer> = {
      status: "active",
    };
    const {
      body: { updatedHelpOffer },
    } = await request(app)
      .patch("/api/help-requests/1/help-offers/2")
      .set("X-User-ID", "2")
      .send(helpOfferBody)
      .expect(200);
    expect(updatedHelpOffer).toMatchObject({
      helper_id: 2,
      help_request_id: 1,
      status: "active",
    });
  });
  test("404 - PATCH: Responds with appropriate error when invalid help_request_id provided", async () => {
    const helpOfferBody: Partial<HelpOffer> = {
      status: "active",
    };
    const {
      body: {
        error: { message },
      },
    } = await request(app)
      .patch("/api/help-requests/gfrf/help-offers/1")
      .set("X-User-ID", "9")
      .send(helpOfferBody)
      .expect(400);
    expect(message).toBe("Invalid help request id provided");
  });
  test("400 - PATCH: Responds with a validation error if help request ID is invalid", async () => {
    const helpOfferBody: Partial<HelpOffer> = {
      status: "active",
    };
    const {
      body: {
        error: { message },
      },
    } = await request(app)
      .patch("/api/help-requests/invalid/help-offers/8")
      .set("X-User-ID", "9")
      .send(helpOfferBody)
      .expect(400);
    expect(message).toBe("Invalid help request id provided");
  });

  test("404 - PATCH: Responds with not found if help request does not exist", async () => {
    const helpOfferBody: Partial<HelpOffer> = {
      status: "active",
    };
    const {
      body: {
        error: { message },
      },
    } = await request(app)
      .patch("/api/help-requests/999/help-offers/8")
      .set("X-User-ID", "9")
      .send(helpOfferBody)
      .expect(404);
    expect(message).toBe("Help request was not found");
  });

  test("401 - PATCH: Responds with unauthorized error if user is not the requester or helper", async () => {
    const helpOfferBody: Partial<HelpOffer> = {
      status: "active",
    };
    const {
      body: {
        error: { message },
      },
    } = await request(app)
      .patch("/api/help-requests/1/help-offers/2")
      .set("X-User-ID", "10")
      .send(helpOfferBody)
      .expect(401);
    expect(message).toBe("User is not authorised");
  });

  test("404 - PATCH: Responds with not found if help offer does not exist", async () => {
    const helpOfferBody: Partial<HelpOffer> = {
      status: "active",
    };
    const {
      body: {
        error: { message },
      },
    } = await request(app)
      .patch("/api/help-requests/5/help-offers/3")
      .set("X-User-ID", "3")
      .send(helpOfferBody)
      .expect(404);
    expect(message).toBe("Help offer was not found");
  });
});

describe("GET /api/help-offers", () => {
  test("200: GET - returns all help offers with associated data", async () => {
    const response = await request(app).get("/api/help-offers").expect(200);

    expect(Array.isArray(response.body.helpOffers)).toBe(true);
    expect(response.body.helpOffers).toHaveLength(6);

    response.body.helpOffers.forEach((offer: any) => {
      expect(offer).toMatchObject({
        help_request_id: expect.any(Number),
        helper_id: expect.any(Number),
        offer_status: expect.any(String),
        offer_created_at: expect.any(String),
        title: expect.any(String),
        description: expect.any(String),
        request_created_at: expect.any(String),
        req_date: expect.any(String),
        request_status: expect.any(String),
        help_type_id: expect.any(Number),
        help_type_name: expect.any(String),
        helper_first_name: expect.any(String),
        helper_last_name: expect.any(String),
        helper_postcode: expect.any(String),
        helper_email: expect.any(String),
        requester_first_name: expect.any(String),
        requester_last_name: expect.any(String),
        requester_postcode: expect.any(String),
        requester_email: expect.any(String),
      });
    });

    const createdDates = response.body.helpOffers.map(
      (offer: any) => new Date(offer.offer_created_at)
    );
    const sortedDates = [...createdDates].sort(
      (a, b) => b.getTime() - a.getTime()
    );
    expect(createdDates).toEqual(sortedDates);
  });
});
