const request = require("supertest");
const baseURL = "http://localhost:3001";
const server = require("../server/index");

const searchData = {
  name: "Gardens by the Bay, Singapore",
  destination_id: "RsBU",
  checkin: "2022-09-10",
  checkout: "2022-09-11",
  lang: "en_US",
  currency: "SGD",
  rooms: "1",
  adults: {
    0: 1,
    1: 1,
    2: 1,
    3: 1,
  },
  guests: 4,
  partner_id: "1",
};

const badDates = {
  destination_id: "RsBU",
  checkin: "2022-07-20",
  checkout: "2022-07-22",
  guests: "2",
};
const noID = {
  destination_id: "",
  checkin: "2022-07-20",
  checkout: "2022-07-22",
  guests: "2",
};
// specific hotels in this case
const length = 174;

describe("given params from feature 1, call api", () => {
  jest.setTimeout(50000);

  it("should respond with 200 status code", async () => {
    const response = await request(baseURL)
      .get("/hotelnprices")
      .query({ data: JSON.stringify(searchData) });
    expect(response.statusCode).toBe(200);
    expect(response.headers["content-type"]).toEqual(
      expect.stringContaining("json")
    );
    expect(response.body.finalData).toBeDefined();
    // expect(JSON.parse(response.body.finalData)).toBe()
    expect(response.body.dataLen).toBeGreaterThan(0);
  });
});

describe("given invalid dates", () => {
  it("should respond with 500 status code", async () => {
    const response = await request(baseURL)
      .get("/hotelidprices")
      .query({ data: JSON.stringify(badDates) });
    expect(response.statusCode).toBe(422);
    expect(response.text).toBe("Request failed with status code 422");
  });
});

describe("Missing id", () => {
  it("should respond with 500 status code", async () => {
    const response = await request(baseURL)
      .get("/hotelidprices")
      .query({ data: JSON.stringify(noID) });
    expect(response.statusCode).toBe(422);
    expect(response.text).toBe("Request failed with status code 422");
  });
});
