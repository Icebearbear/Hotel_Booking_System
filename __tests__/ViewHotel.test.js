const request = require("supertest");
const baseURL = "http://localhost:3001";
const server = require("../server/index");

// viewhotel recieves hotelId, returns data and iurl
describe("/viewhotel call api with hotelId", () => {

    const invalidHotelId = {invHotelId: "192198323&"};
    const hotelId = {hotelId: "diH7"};

    // beforeAll(async () => {
    //     const response = await request(baseURL).post("/viewhotel").send(hotelId);
    // })

    it("should return 200 status code", async () => {
        const response = await request(baseURL).get("/viewhotel").query(hotelId);
        expect(response.statusCode).toBe(200);
    })

    it("should return hotelName", async () => {
        const response = await request(baseURL).get("/viewhotel").query(hotelId);
        expect(response.statusCode).toBe(200);
        const hotelData = JSON.parse(response.body.data);
        const hotelName = hotelData["name"];
        expect(hotelName).toBe("The Fullerton Hotel Singapore");
    })

    it("should return an empty object", async () => {
        const response = await request(baseURL).get("/viewhotel").query(invalidHotelId);
        expect(response.body.data).toBe("{}");
    })
}) 

describe("call api with searchData from searchhotelresults", () => {
    const searchData = {
        hotel_id: "eqUd",
        destination_id: "RsBU",
        checkin: "2022-07-28",
        checkout: "2022-08-03",
        lang: "en_US",
        currency: "SGD",
        country_code: "SG",
        guests: "2",
        partner_id: "1",
    };

    const invalidSearchDataId = {
        hotel_id: "12222",
        destination_id: "RsBU",
        checkin: "2022-07-20",
        checkout: "2022-08-03",
        lang: "en_US",
        currency: "SGD",
        country_code: "SG",
        guests: "2",
        partner_id: "1",
    };

    it("should respond with 200 status code", async () => {
        const response = await request(baseURL).get("/hotelidprices").query({data: JSON.stringify(searchData)});
        expect(response.statusCode).toBe(200);
    })

    it("should return 44 rooms", async () => {
        const response = await request(baseURL).get("/hotelidprices").query({data: JSON.stringify(searchData)});
        expect(response.statusCode).toBe(200);
        expect(response.body.rooms.length).toBe(44);
    })
    
    it("should return undefined", async () => {
        const response = await request(baseURL).get("/hotelidprices").query({data: JSON.stringify(invalidSearchDataId)});
        expect(response.statusCode).toBe(422);
        expect(response.text).toBe("Request failed with status code 422");
    }) 
})
