const request = require("supertest");
const baseURL = "http://localhost:3001";
const server = require("../server/index");
let rand = Math.floor(Math.random() * 10);

describe("POST /api", () => {
  it("should return 200", async () => {
    const response = await request(baseURL).get("/api");
    expect(response.statusCode).toBe(200);
    // expect(response.body.error).toBe(null);
  });
});
// describe("POST /registration", () => {
//   it("should return user added with email: a@gmail.com", async () => {
//     const userDetails = {
//       first_name: "test_first_name",
//       last_name: "test_last_name",
//       email: "aa" + rand + "@gmail.com",
//       password: "123qwe",
//     };
//     const response = await request(baseURL).post("/register").send(userDetails);
//     expect(response.statusCode).toBe(200);
//     expect(JSON.parse(response.body.data)).toBe(
//       "user added with email: " + userDetails.email
//     );
//   });

//   it("return email-already-exist", async () => {
//     const userDetails = {
//       first_name: "test_first_name",
//       last_name: "test_last_name",
//       email: "a@gmail.com",
//       password: "123qwe",
//     };
//     const response = await request(baseURL).post("/register").send(userDetails);
//     expect(response.statusCode).toBe(500);
//     expect(JSON.parse(response.text).code).toBe("auth/email-already-in-use");
//   });

//   it("return invalid-email", async () => {
//     const userDetails = {
//       first_name: "test_first_name",
//       last_name: "test_last_name",
//       email: "agmail.com",
//       password: "123qwe",
//     };
//     const response = await request(baseURL).post("/register").send(userDetails);
//     expect(response.statusCode).toBe(500);
//     expect(JSON.parse(response.text).code).toBe("auth/invalid-email");
//   });

//   it("return weak-password", async () => {
//     const userDetails = {
//       first_name: "test_first_name",
//       last_name: "test_last_name",
//       email: "a@gmail.com",
//       password: "123",
//     };
//     const response = await request(baseURL).post("/register").send(userDetails);
//     expect(response.statusCode).toBe(500);
//     expect(JSON.parse(response.text).code).toBe("auth/weak-password");
//   });
// });

describe("POST /login", () => {
  it("should return userId and email", async () => {
    const userDetails = {
      email: "a@gmail.com",
      password: "123qwe",
    };
    const expectedValues = {
      uId: "EdPDTW6cmVhsBICgZNYWxHCPIDi2",
      uemail: "a@gmail.com",
    };
    const response = await request(baseURL).post("/login").send(userDetails);
    expect(response.statusCode).toBe(200);
    expect(response.body.userId).toBe(expectedValues.uId);
    expect(response.body.email).toBe(expectedValues.uemail);
  });

  it("return invalid-email", async () => {
    const userDetails = {
      email: "agmail.com",
      password: "123qwe",
    };
    const response = await request(baseURL).post("/login").send(userDetails);
    expect(response.statusCode).toBe(500);
    expect(JSON.parse(response.text).code).toBe("auth/invalid-email");
  });

  it("return user-not-found", async () => {
    const userDetails = {
      email: "b@gmail.com",
      password: "123qwe",
    };
    const response = await request(baseURL).post("/login").send(userDetails);
    expect(response.statusCode).toBe(500);
    expect(JSON.parse(response.text).code).toBe("auth/user-not-found");
  });

  it("return wrong-password", async () => {
    const userDetails = {
      email: "a@gmail.com",
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
      email: "a@gmail.com",
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
  const userDetails = {
    first_name: "changed_first_name" + rand,
    last_name: "changed_last_name1" + rand,
    email: "a" + rand + "@gmail.com",
    uid: "EdPDTW6cmVhsBICgZNYWxHCPIDi2",
    dbDocId: "bLPVNzRnGCJk6q6uqG5C",
  };
  const wrongUserDetails = {
    first_name: "changed_first_name",
    last_name: "changed_last_name",
    email: "a@gmail.com",
    uid: "wrong_uid",
    dbDocId: "bLPVNzRnGCJk6q6uqG5C",
  };

  it("return updated", async () => {
    const response = await request(baseURL).post("/edituser").send(userDetails);
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe("updated");
  });

  it("return not-found because of wrong docId", async () => {
    const response = await request(baseURL)
      .post("/edituser")
      .send(wrongUserDetails);
    expect(response.statusCode).toBe(404);
    expect(response.text).toBe("not-found");
  });

  it("return not-new-data-given because inputs are not new", async () => {
    const response = await request(baseURL).post("/edituser").send(userDetails);
    expect(response.statusCode).toBe(500);
    expect(JSON.parse(response.text).code).toBe("not-new-data-given");
  });
});

describe("POST /user", () => {
  // login before test
  var userDetails = {
    uid: "",
  };
  const expectedValues = {
    docId: "bLPVNzRnGCJk6q6uqG5C",
    data: {
      uid: "EdPDTW6cmVhsBICgZNYWxHCPIDi2",
      first_name: "changed_first_name" + rand,
      last_name: "changed_last_name1" + rand,
      email: "a" + rand + "@gmail.com",
    },
  };
  const wrongUserDetails = {
    uid: "wrong_id",
  };

  beforeAll(async () => {
    const loginDetails = {
      email: "a@gmail.com",
      password: "123qwe",
    };
    const response = await request(baseURL).post("/login").send(loginDetails);
    userDetails.uid = response.body.userId;
  });

  it("return docId and doc.data", async () => {
    const response = await request(baseURL).get("/user").query(userDetails);
    expect(response.statusCode).toBe(200);
    expect(response.body.id).toBe(expectedValues.docId);
    expect(response.body.data.uid).toBe(expectedValues.data.uid);
    expect(response.body.data.first_name).toBe(expectedValues.data.first_name);
    expect(response.body.data.last_name).toBe(expectedValues.data.last_name);
    expect(response.body.data.email).toBe(expectedValues.data.email);
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
