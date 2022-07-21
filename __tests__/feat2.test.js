const request = require("supertest");
const baseURL = "http://localhost:3001";
const server = require("../server/index");

const searchData = {
    destination_id: "RsBU",
    checkin: "2022-07-24",
    checkout: "2022-07-26",
    // lang: "en_US",
    // currency: "SGD",
    // country_code: "SG",
     guests: "2",  // 1 room 2 guests,  if >1 room eg "3|2" is 3 rooms 2 guest each
    // partner_id: "1",
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
const length = 180;

describe("given params from feature 1, call api" , ()=> {
    it("should respond with 200 status code", async ()=> {
        
        const response = await request(baseURL).get("/hotelnprices").query({ data: JSON.stringify(searchData)});
        expect(response.statusCode).toBe(200)
        expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
        expect(response.body.finalData).toBeDefined()
        // expect(JSON.parse(response.body.finalData)).toBe()
        expect(response.body.dataLen).toBe(length);
    })
})

describe("given invalid dates" , ()=> {
    it("should respond with 500 status code", async ()=> {
        
        const response = await request(baseURL).get("/hotelnprices").query({ data: JSON.stringify(badDates)});
        expect(response.statusCode).toBe(422)
        expect(response.text).toBe("Request failed with status code 422")
    })
})

describe("Missing id" , ()=> {
    it("should respond with 500 status code", async ()=> {
        
        const response = await request(baseURL).get("/hotelnprices").query({ data: JSON.stringify(noID)});
        expect(response.statusCode).toBe(422)
        expect(response.text).toBe("Request failed with status code 422")
    })
})
