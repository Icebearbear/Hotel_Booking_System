const request = require("supertest");
const baseURL = "http://localhost:3001";
const server = require("../server/index");
describe("GET / , /login , /registration", () => {
  // save username and password to database
  // respond w a json containing userId and email
  // respond 200 status code
  it("should return 200", async () => {
    const response = await request(baseURL).get("/api");
    expect(response.statusCode).toBe(200);
    // expect(response.body.error).toBe(null);
  });

  //   //   it("return userId and email", async () => {
  //   //     const response = await request(baseURL).get("/");
  //   //     expected(response.body.data.length >= 1).toBe
  //   //   })
  //   // specify json in content type header?
  // });

  // describe("Sample Test", () => {
  //   it("should test that true === true", () => {
  //     expect(true).toBe(true);
  //   });
});
