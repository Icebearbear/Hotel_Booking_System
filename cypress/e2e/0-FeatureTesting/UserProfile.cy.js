describe("User look at search page", () => {
  const bookingData = [
    "mBl3JLAEWVbfaxrOxX8D",
    {
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
    },
  ];

  const userData = {
    email: "registeroup@gmail.com",
    first_name: "test_first_name",
    last_name: "test_last_name",
    uid: "yyJbA5LPIOdaPPyMImcd7Q0BH4J2",
  };

  beforeEach(() => {
    localStorage.setItem("LOGIN", false);
    cy.visit("http://localhost:3000/");
    cy.wait(1000);

    cy.contains("Login/Register").scrollIntoView().click();
    cy.location("pathname").should("eq", "/login");
    cy.wait(1000);

    // at login page
    cy.get("#email").type("registeroup@gmail.com");
    cy.get("#pw").type("123qwe");
    cy.contains("Submit").click();
    cy.wait(1000);
    cy.location("pathname").should("eq", "/");
  });

  it("User view user profile", () => {
    // cy.contains("User Profile").should("be.visible");
    cy.contains("User Profile").scrollIntoView().click();
    // cy.location("pathname").should("eq", "/searchhotel");
    // cy.wait(500);
    cy.get('[data-cy = "name"]').should(
      "contain",
      userData.first_name + " " + userData.last_name
    );
    cy.get("#uid").should("contain", userData.uid);
    cy.get("#email").should("contain", userData.email);
  });

  // it("User edit profile", () => {
  //   const new_fname = "changed fname";
  //   const new_lname = "changed lname";
  //   const new_email = "anew@gmail.com";
  //   cy.contains("User Profile").scrollIntoView().click();
  //   cy.contains("Edit Profile").scrollIntoView().click();

  //   cy.location("pathname").should("eq", "/editprofile");
  //   cy.get("#formBasicFName").type(new_fname);
  //   cy.get("#formBasicLName").type(new_lname);
  //   cy.get("#formBasicEmail").type(new_email);
  //   cy.contains("update email").click();
  //   cy.location("pathname").should("eq", "/userspage");
  //   cy.wait(500);

  //   cy.contains("#names").should("contain", new_fname + " " + new_lname);
  //   cy.contains("email").should("contain", new_email);
  // });

  // it("User edit profile without giving correct inputs at first", () => {
  //   const new_fname = "changed fname";
  //   const new_lname = "changed lname";
  //   const new_email = "anew1@gmail.com";

  //   const wrong_fname = "";
  //   const wrong_lname = "";
  //   const wrong_email = "anew@gmai";

  //   cy.contains("User Profile").scrollIntoView().click();
  //   cy.contains("Edit Profile").scrollIntoView().click();

  //   cy.location("pathname").should("eq", "/editprofile");
  //   cy.get("#formBasicFName").type(wrong_fname);
  //   cy.get("#formBasicLName").type(wrong_lname);
  //   cy.get("#formBasicEmail").type(wrong_email);

  //   cy.contains("update email").click();
  //   cy.wait(500);
  //   cy.location("pathname").should("eq", "/editprofile");

  //   cy.contains("Please input valid last name")
  //     .scrollIntoView()
  //     .should("be.visible");
  //   cy.contains("Please input valid email address")
  //     .scrollIntoView()
  //     .should("be.visible");

  //   cy.get("#formBasicFName").type(new_fname);
  //   cy.get("#formBasicLName").type(new_lname);
  //   cy.get("#formBasicEmail").type(new_email);
  //   cy.contains("update email").click();
  //   cy.wait(500);

  //   cy.location("pathname").should("eq", "/userspage");

  //   cy.get("#names").should("contain", new_fname + " " + new_lname);
  //   cy.get("#email").should("contain", new_email);
  // });

  // it("User press go back to search page", () => {
  //   cy.contains("User Profile").scrollIntoView().click();
  //   cy.contains("Back to Search").scrollIntoView().click();
  //   cy.location("pathname").should("eq", "/searchhotel");
  // });

  // it("User press logout", () => {
  //   cy.contains("User Profile").scrollIntoView().click();
  //   cy.contains("Logout").scrollIntoView().click();
  //   cy.location("pathname").should("eq", "/searchhotel");
  //   cy.contains("Login/Register").scrollIntoView().click();
  //   cy.location("pathname").should("eq", "/login");
  // });

  // it("User view bookings and cancels one", () => {
  //   cy.get('[data-testid="hotelname"]').should(
  //     "contain",
  //     bookingData[1].hotelName
  //   );
  //   cy.get('[data-testid="roomtype"]').should(
  //     "contain",
  //     bookingData[1].bookingInfo.roomType
  //   );
  //   cy.get('[data-testid="dates"]').should(
  //     "contain",
  //     bookingData[1].bookingInfo.startDate +
  //       " until " +
  //       bookingData[1].bookingInfo.endDate
  //   );
  //   cy.get('[data-testid="details"]').should(
  //     "contain",
  //     bookingData[1].bookingInfo.noNight +
  //       " until " +
  //       bookingData[1].bookingInfo.noAdult
  //   );
  //   cy.contains(`[data-testid="cancel ${bookingData[1].hotelName}"]`).click();

  //   cy.get("Are you sure you want to cancel this booking ?").should("exist");
  //   cy.contains("No").click();
  //   cy.get(bookingData[1].hotelName).should("exist");
  //   cy.contains("Yes").click();
  //   cy.get(bookingData[1].hotelName).should("not.exist");
  //   cy.get(bookingData[1].bookingInfo.roomType).should("not.exist");
  //   cy.get(
  //     bookingData[1].bookingInfo.startDate +
  //       " until " +
  //       bookingData[0].bookingInfo.endDate
  //   ).should("not.exist");
  //   cy.get(
  //     bookingData[1].bookingInfo.noNight +
  //       " until " +
  //       bookingData[0].bookingInfo.noAdult
  //   ).should("not.exist");
  // });
});

// describe("No booking user", () => {
//   const userData = {
//     email: "aa8@gmail.com",
//     first_name: "test_first_name",
//     last_name: "test_last_name",
//     uid: "bdUlRMf2m8SUUebJZBjkW5qh7uH3",
//   };

//   beforeEach(() => {
//     cy.visit("http://localhost:3000/searchhotel");
//     cy.contains("Search Page").scrollIntoView().click();
//     cy.contains("Login/Register").scrollIntoView().click();
//     cy.location("pathname").should("eq", "/login");
//     cy.wait(500);

//     // at login page
//     cy.get("#formBasicEmail").type(userData.email);
//     cy.get("#formBasicPassword").type("123qwe");
//     cy.contains("Submit").click();
//     cy.location("pathname").should("eq", "/searchhotel");
//     cy.wait(500);
//     cy.contains("User Profile").scrollIntoView().click();
//   });
//   it("User with no booking will see a no booking reminder message", () => {
//     cy.get("You have no bookings at this moment").should("exist");
//     cy.get("You can return to main page to continue use our service.");
//   });
// });

// describe("Not loged in user cannot view users page", () => {
//   beforeEach(() => {
//     cy.visit("http://localhost:3000/userspage");
//   });

//   it("a warning to login show up", () => {
//     cy.location("pathname").should("eq", "/userspage");
//     cy.get("User Page require login").should("exist");
//     cy.get("Login is required").should("exist");
//     cy.contains("Back").click();
//     cy.location("pathname").should("eq", "/userspage");
//     cy.contains("Login/Register").scrollIntoView().click();
//     cy.location("pathname").should("eq", "/login");
//     cy.wait(500);

//     // at login page
//     cy.get("#formBasicEmail").type("a@gmail.com");
//     cy.get("#formBasicPassword").type("123qwe");
//     cy.contains("Submit").click();
//     cy.location("pathname").should("eq", "/searchhotel");
//     cy.get("User Page require login").should("not.exist");
//   });
// });
