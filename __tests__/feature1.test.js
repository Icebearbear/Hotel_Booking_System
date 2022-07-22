const request = require("supertest");
const baseURL = "http://localhost:3001";
const server = require("../server/index");

describe("POST /api", () => {
  it("should return 200", async () => {
    const response = await request(baseURL).get("/api");
    expect(response.statusCode).toBe(200);
    // expect(response.body.error).toBe(null);
  });
});
