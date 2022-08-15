const request = require("supertest");
const baseURL = "http://localhost:3001";
const server = require("../server/index");

describe("POST /mail to empty email shows unsuccessful", () => {
  const infoObject = {
    hotelName: "Hotel_name_unit_test",
    bookingDeets: { dates: "dates", nonsmoking: true },
    payment_id: "payment_id",
    guestInformation: {
      email: "",
      first_name: "yuli",
    },
    payeeInformation: {
      paymentID: "paymentID",
    },
  };
  it("should show status 500", async () => {
    const response = await request(baseURL).post("/mail").send(infoObject);
    expect(response.statusCode).toBe(500);
    expect(response.body.msg).toBe("fail");
  });
});

describe("POST /mail to invalid email shows unsuccessful", () => {
  const infoObject = {
    hotelName: "Hotel_name_unit_test",
    bookingDeets: { dates: "dates", nonsmoking: true },
    payment_id: "payment_id",
    guestInformation: {
      email: "com",
      first_name: "yuli",
    },
    payeeInformation: {
      paymentID: "paymentID",
    },
  };
  it("should show status 500", async () => {
    const response = await request(baseURL).post("/mail").send(infoObject);
    expect(response.statusCode).toBe(500);
    expect(response.body.msg).toBe("fail");
  });
});

describe("POST /mail to send email", () => {
  const infoObject = {
    hotelName: "Hotel_name_unit_test",
    bookingDeets: { dates: "dates", nonsmoking: true },
    payment_id: "payment_id",
    guestInformation: {
      email: "yuliatiyuli39@gmail.com",
      first_name: "yuli",
    },
    payeeInformation: {
      paymentID: "paymentID",
    },
  };
  it("should show status 200", async () => {
    const response = await request(baseURL).post("/mail").send(infoObject);
    expect(response.statusCode).toBe(200);
    expect(response.body.msg).toBe("success");
  });
});
