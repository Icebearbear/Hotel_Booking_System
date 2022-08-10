describe("User looking at the hotel page", () => {
    
    const infoObject = {
        destinationID: "RsBU",
        hotelID: "eqUd",
        hotelName: "Grand Copthorne Waterfront",
        bookingInfo: {
          noNight: 1,
          startDate: "2022-08-28",
          endDate: "2022-09-01",
          noAdult: 2,
          roomType: "Beautiful Balcony",
          bookForSomeone: "",
          smoking: "",
          bedType: "",
          highFloor: "",
          quiteRoom: "",
          babyCotReq: "",
          airportTransfer: "",
          extraReq: "",
        },
        price: 100,
        supplierBookingID: "sbID",
        supplierBookingRespond: "sbrID",
        bookingReference: "bref",
        guestInformation: {
          userID: "",
          salutation: "Ms",
          firstName: "Bob",
          lastName: "Jim",
          email: "",
          phone: "12345667",
          country: "US",
        },
        payeeInformation: {
          paymentID: "",
          payeeID: "",
          // billingAddress: Object.assign({ address: address }, addressObj),
        },
        uid: "",
      };

    beforeEach(() => {
        cy.viewport(1280, 720);
        localStorage.setItem(
            "HOTEL_BOOKING_INFO",
            JSON.stringify(infoObject)
          ); 
        // arrange
        cy.visit("http://localhost:3000/success");
        cy.wait(1000);
      });

    it("views success page",() => {
        cy.contains("You have checked out succesfully!").should("be.visible");
        cy.contains("Back to Search hotel").should("be.visible");
        cy.wait(5000);
        
        cy.location("pathname").should("eq", "/searchhotel");
    })

})