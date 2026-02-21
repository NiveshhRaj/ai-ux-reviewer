import request from "supertest";
import app from "../index.js";

describe("POST /api/reviews", () => {
  it("should return 400 if URL missing", async () => {
    const res = await request(app).post("/api/reviews").send({});
    expect(res.statusCode).toBe(400);
  });
});