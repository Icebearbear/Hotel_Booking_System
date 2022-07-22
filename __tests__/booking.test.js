const request = require("supertest");
const baseURL = "http://localhost:3001";
const server = require("../server/index");
// it("return booked with 200 status code", async () => {
const infoObject = {
  destinationID: "destId",
  hotelID: "hotelId",
  bookingInfo: {
    noNight: 2,
    startDate: "checkInDate",
    endDate: "checkOutDate",
    noAdult: 2,
    noChildren: 2,
    message: "booking for birthday celebration",
    roomType: "hotelRoomType",
    bookForSomeone: true,
    smoking: false,
    bedType: "bed",
    highFloor: true,
    quiteRoom: true,
    babyCotReq: true,
    airportTransfer: false,
    extraReq: "extraReq",
  },
  price: 3000,
  supplierBookingID: "sbID",
  supplierBookingRespond: "sbrID",
  bookingReference: "bref",
  guestInformation: {
    userID: "uid",
    salutation: "Ms",
    firstName: "firstName",
    lastName: "lastName",
    email: "yu@gmail.com",
    phone: 12345678,
    country: "country",
  },
  payeeInformation: {
    paymentID: "",
    payeeID: "uid",
  },
  uid: "NPkGDo2eyEYqcN48BjBkvj6mA1h2",
};

describe("POST /getBook", () => {
  var userDetails = {
    uid: "NPkGDo2eyEYqcN48BjBkvj6mA1h2",
  };
  var wrongUserDetails = {
    uid: "wrong_uid",
  };
  it("should return booking data with matched uid", async () => {
    const response = await request(baseURL).get("/getBook").query(userDetails);
    expect(response.statusCode).toBe(200);
    expect(response.body.finalData.length).toBe(2); // returned booking data by user uid
    // check if all of the uid from data returned matches the input uid
    for (var i = 0; i < response.body.finalData.length; i++) {
      expect(response.body.finalData[i][1]["uid"]).toBe(userDetails.uid);
    }
  });

  it("should return not-found because unmatched uid", async () => {
    const response = await request(baseURL)
      .get("/getBook")
      .query(wrongUserDetails);
    expect(response.statusCode).toBe(404);
    expect(response.text).toBe("Not Found");
  });
});

describe("POST /deleteBook", () => {
  var totalBooking = 0;
  var bookingList = [];

  beforeAll(async () => {
    const userDetails = {
      uid: "NPkGDo2eyEYqcN48BjBkvj6mA1h2",
    };
    const response = await request(baseURL).get("/getBook").query(userDetails);
    totalBooking = response.body.finalData.length;
    for (var i = 0; i < totalBooking; i++) {
      bookingList.push(response.body.finalData[i][0]);
    }
  });

  it("should return updated data after random deletion", async () => {
    // randomly select 1 booking from booking list
    var item = bookingList[Math.floor(Math.random() * bookingList.length)];
    const delDetails = {
      docId: item,
      userID: "NPkGDo2eyEYqcN48BjBkvj6mA1h2",
    };
    const response = await request(baseURL)
      .post("/deleteBook")
      .send(delDetails);
    expect(response.statusCode).toBe(200);
    expect(response.body.finalData.length).toBe(totalBooking - 1); // returned booking data by user uid
    // check if all of the uid from data returned matches the input uid
    for (var i = 0; i < response.body.finalData.length; i++) {
      expect(response.body.finalData[i][1]["uid"]).toBe(delDetails.userID);
    }
  });

  it("should return not found if booking doesn't exists", async () => {
    const delDetails = {
      docId: "FDIqJyMi757RJOFeEaCh",
      userID: "CiX8KlN9UtBvsEFcCoLa",
    };
    const response = await request(baseURL)
      .post("/deleteBook")
      .send(delDetails);
    expect(response.statusCode).toBe(404);
    expect(response.text).toBe("No such booking found");
  });

  it("should return not found if booking doesn't exists", async () => {
    const delDetails = {
      docId: "FDIqJyMi757RJOFeEaCh",
      userID: "wrong_id",
    };
    const response = await request(baseURL)
      .post("/deleteBook")
      .send(delDetails);
    expect(response.statusCode).toBe(404);
    expect(response.text).toBe("No such booking found");
  });
});

describe("POST /bookhotel login error", () => {
  beforeAll(async () => {
    const response = await request(baseURL).post("/logout");
  });
  /// check if user is loged in
  it("should return login required", async () => {
    const response = await request(baseURL).post("/bookhotel").send(infoObject);
    expect(response.statusCode).toBe(500);
    expect(response.text).toBe("Login required");
  });
});

describe("POST /bookhotel", () => {
  beforeAll(async () => {
    const loginDetails = {
      email: "a@gmail.com",
      password: "123qwe",
    };
    const response = await request(baseURL).post("/login").send(loginDetails);
    infoObject.uid = response.body.userId;
  });

  it("should return booked", async () => {
    const response = await request(baseURL).post("/bookhotel").send(infoObject);
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe("booked");
    expect(response.body.docId).toBeDefined();
  });
});

// describe("POST /create-checkout-session", () => {
//   it("should return booked", async () => {
//     const response = await request(baseURL)
//       .post("/create-checkout-session")
//       .send(infoObject);
//     expect(response.statusCode).toBe(200);
//     expect(response.body.url).toBeDefined();
//     expect(response.body.paymentID).toBeDefined();
//   });
// });
