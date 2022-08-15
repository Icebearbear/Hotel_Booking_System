const request = require("supertest");
const baseURL = "http://localhost:3001";
const server = require("../server/index");
let rand = Math.floor(Math.random() * 10);

function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

describe("POST /api", () => {
  it("should return 200", async () => {
    const response = await request(baseURL).get("/api");
    expect(response.statusCode).toBe(200);
    // expect(response.body.error).toBe(null);
  });
});
describe("POST /registration", () => {
  beforeEach(async () => {
    const nid = makeid(3);
    const userDetails = {
      email: "sas@gmail.com",
      password: "123qwe",
    };
    const response = await request(baseURL).post("/login").send(userDetails);
    expect(response.statusCode).toBe(200);
  });
  it("should return user added with email", async () => {
    const userDetails = {
      first_name: "test_first_name",
      last_name: "test_last_name",
      email: "register" + makeid(3) + "@gmail.com",
      password: "123qwe",
    };
    const response = await request(baseURL).post("/register").send(userDetails);
    expect(response.statusCode).toBe(200);
    expect(response.text).toBeDefined();
  });

  it("return email-already-exist", async () => {
    const userDetails = {
      first_name: "test_first_name",
      last_name: "test_last_name",
      email: "sas@gmail.com",
      password: "123qwe",
    };
    const response = await request(baseURL).post("/register").send(userDetails);
    expect(response.statusCode).toBe(500);
    expect(response.text).toBe(
      '"Firebase: Error (auth/email-already-in-use)."'
    );
  });
});

describe("POST /login", () => {
  it("should return userId and email", async () => {
    const userDetails = {
      email: "sas@gmail.com",
      password: "123qwe",
    };
    const expectedValues = {
      uId: "EdPDTW6cmVhsBICgZNYWxHCPIDi2",
      uemail: "sas@gmail.com",
    };
    const response = await request(baseURL).post("/login").send(userDetails);
    expect(response.statusCode).toBe(200);

    expect(JSON.parse(response.text).userId).toBe(expectedValues.uId);
    expect(JSON.parse(response.text).email).toBe(expectedValues.uemail);
  });

  it("return invalid-email", async () => {
    const userDetails = {
      email: "agmail",
      password: "123qwe",
    };
    const response = await request(baseURL).post("/login").send(userDetails);
    expect(response.statusCode).toBe(500);
    expect(JSON.parse(response.text).code).toBe("auth/invalid-email");
  });

  it("return user-not-found", async () => {
    const userDetails = {
      email: "doesntexist@gmail.com",
      password: "123qwe",
    };
    const response = await request(baseURL).post("/login").send(userDetails);
    expect(response.statusCode).toBe(500);
    expect(JSON.parse(response.text).code).toBe("auth/user-not-found");
  });

  it("return wrong-password", async () => {
    const userDetails = {
      email: "sas@gmail.com",
      password: "123",
    };
    const response = await request(baseURL).post("/login").send(userDetails);
    expect(response.statusCode).toBe(500);
    expect(JSON.parse(response.text).code).toBe("auth/wrong-password");
  });
});

describe("POST /logout", () => {
  // login before test
  beforeAll(async () => {
    const userDetails = {
      email: "sas@gmail.com",
      password: "123qwe",
    };
    await request(baseURL).post("/login").send(userDetails);
  });
  it("return signout", async () => {
    const response = await request(baseURL).post("/logout");
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe("signed out");
  });
});

/////// change userDetails before start testing
describe("POST /edituser", () => {
  var userId;

  var wrongUserDetails = {
    first_name: "changed_first_name" + makeid(3),
    last_name: "changed_last_name1" + makeid(3),
    email: "t" + makeid(6) + "@gmail.com",
    uid: "wrong_uid",
    dbDocId: "bLPVNzRnGCJk6q6uqG5Ca",
  };

  beforeEach(async () => {
    const loginUserDetails = {
      email: "testing@gmail.com",
      password: "123qwe",
    };
    await request(baseURL).post("/login").send(loginUserDetails);
  });

  it("return updated", async () => {
    const newUserDetails = {
      first_name: "test_first_name",
      last_name: "test_last_name",
      email: makeid(5) + "@gmail.com",
      password: "123qwe",
    };
    const res = await request(baseURL).post("/register").send(newUserDetails);
    expect(res.statusCode).toBe(200);
    var userDetails = {
      first_name: "changed_first_name" + makeid(3),
      last_name: "changed_last_name1" + makeid(3),
      email: "testing" + makeid(3) + "@gmail.com",
      uid: JSON.parse(res.text).uId,
      dbDocId: "bLPVNzRnGCJk6q6uqG5Ca",
    };
    const response = await request(baseURL).post("/edituser").send(userDetails);
    // expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.text).code).toBe("not-found");
  });

  it("return not-found because of wrong docId", async () => {
    const response = await request(baseURL)
      .post("/edituser")
      .send(wrongUserDetails);
    expect(response.statusCode).toBe(404);
    expect(JSON.parse(response.text).code).toBe("auth/not-found");
  });

  it("return not-new-data-given because inputs are not new", async () => {
    const newUserDetails = {
      first_name: "test_first_name",
      last_name: "test_last_name",
      email: makeid(5) + "@gmail.com",
      password: "123qwe",
    };
    const res = await request(baseURL).post("/register").send(newUserDetails);
    expect(res.statusCode).toBe(200);
    var userDetails = {
      first_name: "changed_first_name" + makeid(3),
      last_name: "changed_last_name1" + makeid(3),
      email: JSON.parse(res.text).data,
      uid: JSON.parse(res.text).uId,
      dbDocId: "bLPVNzRnGCJk6q6uqG5Ca",
    };
    const response = await request(baseURL).post("/edituser").send(userDetails);
    expect(response.statusCode).toBe(500);
    expect(JSON.parse(response.text).code).toBe("auth/not-newdatagiven");
  });
});

describe("POST /user", () => {
  // login before test
  var userDetails = {
    uid: "",
  };

  const wrongUserDetails = {
    uid: "wrong_id",
  };

  beforeAll(async () => {
    const loginDetails = {
      email: "testing@gmail.com",
      password: "123qwe",
    };
    const response = await request(baseURL).post("/login").send(loginDetails);
    userDetails.uid = response.body.userId;
  });

  it("return docId and doc.data", async () => {
    const response = await request(baseURL).get("/user").query(userDetails);
    expect(response.statusCode).toBe(200);
    expect(response.body.id).toBeDefined();
  });

  it("return Not Found", async () => {
    const response = await request(baseURL)
      .get("/user")
      .query(wrongUserDetails);
    expect(response.statusCode).toBe(404);
    expect(response.text).toBe("Not Found");
  });

  it("return invalid-argument when no params passed", async () => {
    const response = await request(baseURL).get("/user");
    expect(response.statusCode).toBe(500);
    expect(JSON.parse(response.text).code).toBe("invalid-argument");
  });
});
