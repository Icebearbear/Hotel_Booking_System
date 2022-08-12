

describe("User looking at the hotel page", () => {

  // set up
  const uid = "testuid";
  const dudData = {
    destination_id: "RsBU",
    hotelId: "eqUd",
    hotelName: "Grand Copthorne Waterfront",
    roomType: "Beautiful Balcony",
    noOfRooms: 3,
    noOfAdults: 3,
    noOfChildren: 1,
    checkIn: "2022-08-28",
    checkOut: "2022-09-01",
    roomRate: "150",
    surcharges: "20",
  };

  beforeEach(() => {
    cy.viewport(1280, 720);
    // arrange
    localStorage.setItem("USER_ID", uid);
    localStorage.setItem("BOOKING_DATA", JSON.stringify(dudData));
    localStorage.setItem("LOGIN", false);
    cy.visit("http://localhost:3000/custinfo");
    cy.wait(1000);
  });

  it("views custinfo page", () => {
    cy.get("h5[controlId='hotelname']").should(
      "contain",
      "Grand Copthorne Waterfront"
    );
    cy.get("h5[id='roomtype']").should("contain", "Beautiful Balcony");
    cy.contains("300").scrollIntoView().should("be.visible");
  });

  it("logs in", () => {
    cy.contains("Login/Register").scrollIntoView().click();
    cy.location("pathname").should("eq", "/login");
    cy.wait(1000);

    // at login page
    cy.get("#formBasicEmail").type("testone@gmail.com");
    cy.get("#formBasicPassword").type("123456");
    cy.contains("Submit").click();
    cy.visit("http://localhost:3000/custinfo");
    cy.wait(1000);
    // should go back to custinfo
    cy.location("pathname").should("eq", "/custinfo");
    cy.contains("User Profile").should("be.visible");
  });

  it("interacts with all interactables and input is visible", () => {
    // Customer Info Page
    cy.get("input#formBasicEmail.form-control").eq(0).type("John");
    cy.get("input#formBasicEmail.form-control").eq(1).type("Watson");
    cy.get("input#formBasicEmail.form-control").eq(2).type("jwatson@gmail.com");
    cy.get("#formBasicPhone").type("12345678");
    cy.get("#formBasicCountry").type("England");
    cy.get("#formBasicCheckbox").click();

    // check form control
    var userInput = ["John", "Watson", "jwatson@gmail.com"];
    for (let i = 0; i < 3; i++) {
      cy.get("input#formBasicEmail.form-control")
        .eq(i)
        .scrollIntoView()
        .should("have.value", userInput[i]);
    }
    cy.get("#formBasicPhone").scrollIntoView().should("have.value", "12345678");
    cy.get("#formBasicCountry")
      .scrollIntoView()
      .should("have.value", "England");
    cy.get("#formBasicCheckbox").should("be.checked");

    cy.wait(500);
    // Special Request
    // smoking pref
    cy.get("input#inline-radio-1.form-check-input")
      .eq(0)
      .click()
      .should("be.checked");
    cy.get("input#inline-radio-1.form-check-input")
      .eq(1)
      .click()
      .should("be.checked");
    // bed pref
    cy.get("input#inline-radio-2.form-check-input")
      .eq(0)
      .click()
      .should("be.checked");
    cy.get("input#inline-radio-2.form-check-input")
      .eq(1)
      .click()
      .should("be.checked");
    // any more req
    for (let i = 0; i < 4; i++) {
      cy.get("input#checkbox-2.form-check-input")
        .eq(i)
        .click()
        .should("be.checked");
    }
    // Personal req
    cy.get("textarea")
      .type("no room service")
      .should("have.value", "no room service");
  });

  it("fills up required info to book hotel", () => {
    cy.get("input#formBasicEmail.form-control").eq(0).type("John");
    cy.get("input#formBasicEmail.form-control").eq(1).type("Watson");
    cy.get("input#formBasicEmail.form-control").eq(2).type("jwatson@gmail.com");
    cy.get("#formBasicCountry").type("England");

    cy.contains("Proceed to next step").scrollIntoView().click({ force: true });
    cy.request("https://checkout.stripe.com/").its("status").should("eq", 200);
    // cy.contains("Powered by stripe").should('be.visible');
  });

  it("did not fill up required info", () => {
    cy.contains("Proceed to next step").scrollIntoView().click({ force: true });
    cy.location("pathname").should("eq", "/custinfo");
    cy.contains("Please input valid first name")
      .scrollIntoView()
      .should("be.visible");
    cy.contains("Please input valid last name")
      .scrollIntoView()
      .should("be.visible");
    cy.contains("Please input valid email address")
      .scrollIntoView()
      .should("be.visible");
    cy.contains("Please input valid country")
      .scrollIntoView()
      .should("be.visible");
  });

  it("only filled up some required info", () => {
    cy.get("#formBasicEmail").type("Bob");
    cy.get("#formBasicCountry").type("USA");

    cy.contains("Proceed to next step").scrollIntoView().click({ force: true });

    cy.location("pathname").should("eq", "/custinfo");
    cy.contains("Please input valid last name")
      .scrollIntoView()
      .should("be.visible");
    cy.contains("Please input valid email address")
      .scrollIntoView()
      .should("be.visible");
  });
});
