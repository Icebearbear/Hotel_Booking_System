const request = require("supertest");
const baseURL = "http://localhost:3001";
const server = require("../server/index");
// it("return booked with 200 status code", async () => {
const infoCheckout = {
  hotelName: "Puri Asri Villa",
  price: 796,
  noNight: 2,
  email: "sas@gmail.com",
};
const infoObject = {
  bookingInfo: {
    airportTransfer: false,
    babyCotReq: false,
    bedType: "large",
    bookForSomeone: false,
    endDate: "2022-08-03",
    extraReq: "staycay",
    highFloor: true,
    message: "booking for birthday celebration",
    noAdult: "2",
    noChildren: "0",
    noNight: 2,
    quiteRoom: true,
    roomType: "Superior Room",
    smoking: false,
    startDate: "2022-07-26",
  },
  guestInformation: {
    country: "sg",
    email: "yuliatiyuli39@gmail.com",
    firstName: "yu",
    lastName: "li",
    phone: "12345",
    salutation: "Ms",
    userID: "EdPDTW6cmVhsBICgZNYWxHCPIDi2",
  },
  hotelID: "y6jp",
  hotelName: "Puri Asri Villa",
  price: 796,
  uid: "EdPDTW6cmVhsBICgZNYWxHCPIDi2",
};

var current_total = 0;

describe("POST /bookhotel", () => {
  beforeAll(async () => {
    const loginDetails = {
      email: "sas@gmail.com",
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
describe("POST /getBook", () => {
  beforeEach(async () => {
    const userDetails = {
      email: "sas@gmail.com",
      password: "123qwe",
    };
    const r = await request(baseURL).post("/login").send(userDetails);

    const response = await request(baseURL).get("/getBook").query(userDetails);
  });

  it("should return booking data with matched uid", async () => {
    var userDetails = {
      uid: "EdPDTW6cmVhsBICgZNYWxHCPIDi2",
    };

    const response = await request(baseURL).get("/getBook").query(userDetails);
    if (typeof response.body.finalData != "undefined") {
      console.log(response.body.finalData);
      current_total = response.body.finalData.length;
    }
    expect(response.statusCode).toBe(200);
    expect(response.body.finalData.length).toBe(current_total); // returned booking data by user uid
    // check if all of the uid from data returned matches the input uid
    for (var i = 0; i < response.body.finalData.length; i++) {
      expect(response.body.finalData[i][1]["uid"]).toBe(userDetails.uid);
    }
  });

  it("should return not-found because unmatched uid", async () => {
    var wrongUserDetails = {
      uid: "wrong_uid",
    };
    const response = await request(baseURL)
      .get("/getBook")
      .query(wrongUserDetails);
    expect(response.statusCode).toBe(404);
    expect(JSON.parse(response.text).code).toBe("auth/not-found");
  });
});

var booking_id = "";
describe("POST /deleteBook", () => {
  var bookingList = [];
  var current_total;
  beforeEach(async () => {
    const userDetails = {
      uid: "EdPDTW6cmVhsBICgZNYWxHCPIDi2",
    };
    const response = await request(baseURL).get("/getBook").query(userDetails);
    if (typeof response.body.finalData != "undefined") {
      console.log(response.body.finalData);
      current_total = response.body.finalData.length;
      for (var i = 0; i < current_total; i++) {
        bookingList.push(response.body.finalData[i][0]);
      }
    }
  });

  it("should return updated data after random deletion", async () => {
    // randomly select 1 booking from booking list
    var item = bookingList[Math.floor(Math.random() * bookingList.length)];
    const delDetails = {
      docId: item,
      userID: "EdPDTW6cmVhsBICgZNYWxHCPIDi2",
    };
    const response = await request(baseURL)
      .post("/deleteBook")
      .send(delDetails);
    console.log(current_total);
    if (current_total == 0) {
      expect(response.statusCode).toBe(500);
    } else {
      var after_delete = current_total - 1;
      expect(response.statusCode).toBe(200);
      expect(response.body.finalData.length).toBe(after_delete); // returned booking data by user uid
      // check if all of the uid from data returned matches the input uid
      for (var i = 0; i < response.body.finalData.length; i++) {
        expect(response.body.finalData[i][1]["uid"]).toBe(delDetails.userID);
      }
    }
  });

  it("should return not found if booking doesn't exists", async () => {
    const delDetails = {
      docId: "wrong_id",
      userID: "CiX8KlN9UtBvsEFcCoLa",
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
    expect(JSON.parse(response.text).code).toBe("permission-denied");
  });
});

describe("POST /bookhotel", () => {
  beforeAll(async () => {
    const loginDetails = {
      email: "sas@gmail.com",
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

describe("POST /create-checkout-session", () => {
  it("should return booked", async () => {
    const response = await request(baseURL)
      .post("/create-checkout-session")
      .send(infoCheckout);
    expect(response.statusCode).toBe(200);
    expect(response.body.url).toBeDefined();
    expect(response.body.paymentID).toBeDefined();
  });
});

describe("POST /create-checkout-session", () => {
  beforeAll(async () => {
    const loginDetails = {
      email: "tester@gmail.com",
      password: "123qwe",
    };
    const response = await request(baseURL).post("/login").send(loginDetails);
    infoObject.uid = response.body.userId;
  });

  it("should return booked", async () => {
    const response = await request(baseURL)
      .post("/create-checkout-session")
      .send(infoCheckout);
    expect(response.statusCode).toBe(200);
    expect(response.body.url).toBeDefined();
    expect(response.body.paymentID).toBeDefined();
  });
});
