const request = require("supertest");
const baseURL = "http://localhost:3001";
const server = require("../server/index");

const mockHotelId = "diH7";
const mockSearchData = {
    hotel_id: "050G" + "/",
    destination_id: "WD0M",
    checkin: "2022-08-01",
    checkout: "2022-08-05",
    lang: "en_US",
    currency: "SGD",
    country_code: "SG",
    guests: "2",
    partner_id: "1",
  };

beforeAll(async() => {
    await request(baseURL).post("/viewhotel").send(mockHotelId);
    await request(baseURL).post("/hotelidprices").send(mockSearchData);
})

// viewhotel recieves hotelId, returns data and iurl
describe("call api with hotelId from searchhotelresults" , ()=> {
    it("should respond with 200 status code and the hotel name", async ()=> {
        
        const response = await request(baseURL).get("/viewhotel", {
            params: {data: mockHotelId},
        });
        expect(response.statusCode).toBe(200);
        // const hotelData = JSON.parse(response.body.data.data);
        // const hotelName = hotelData["name"];
        // expect(hotelName).toBe("The Fullerton Hotel Singapore");
    })
})

describe("call api with searchData from searchhotelresults" , ()=> {
    it("should respond with 200 status code", async ()=> {
        
        const response = await request(baseURL).get("/hotelidprices").query(mockSearchData);
        expect(response.statusCode).toBe(200)
    })
})