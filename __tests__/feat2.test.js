const request = require("supertest");
const baseURL = "http://localhost:3001";
const server = require("../server/index");

const searchData = {
    destination_id: "WD0M",
    checkin: "2022-07-24",
    checkout: "2022-07-25",
    // lang: "en_US",
    // currency: "SGD",
    // country_code: "SG",
     guests: "2",  // 1 room 2 guests,  if >1 room eg "3|2" is 3 rooms 2 guest each
    // partner_id: "1",
};

describe("given params from feature 1, call api" , ()=> {
    it("should respond with 200 status code", async ()=> {
        
        const response = await request(baseURL).get("/hotelnprices", {
            params: {data: searchData},
        });
        expect(response.statusCode).toBe(200)
    })
})