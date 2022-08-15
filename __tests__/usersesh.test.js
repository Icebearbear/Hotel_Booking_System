const request = require("supertest");
const baseURL = "http://localhost:3001";
const server = require("../server/index");

describe("POST /user correct input", () => {
  beforeEach(async () => {
    const userDetails = {
      email: "sas@gmail.com",
      password: "123qwe",
    };
    const r = await request(baseURL).post("/login").send(userDetails);
  });

  var uidDetails = {
    uid: "EdPDTW6cmVhsBICgZNYWxHCPIDi2",
  };
  var wrongUidDetails = {
    uid: "wrong_uid",
  };

  it("should return user details based on uid", async () => {
    const response = await request(baseURL).get("/user").query(uidDetails);
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeDefined();
    expect(Object.keys(response.body).length).toBe(2);
  });
  it("should return user details based non existing uid", async () => {
    const response = await request(baseURL).get("/user").query(wrongUidDetails);
    expect(response.statusCode).toBe(404);
    expect(response.body).toBeDefined();
  });
});