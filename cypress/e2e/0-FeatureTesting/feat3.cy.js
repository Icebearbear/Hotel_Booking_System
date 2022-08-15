  describe("User looking at the hotel page", () => {
  // set up
  const passData = {
    name: "Amsterdam ArenA, Amsterdam, Netherlands",
    destination_id: "5qq3",
    checkin: "2022-08-24T08:05:11.957Z",
    checkout: "2022-08-28T16:00:00.000Z",
    lang: "en_US",
    currency: "SGD",
    rooms: "1",
    adults: {0: 1, 1: 1, 2: 1, 3: 1},
    guests: 1,
    partner_id: "1",
  };

  beforeEach(() => {
    cy.viewport(1024, 768)
    localStorage.setItem("SEARCH_DATA", JSON.stringify(passData));
    cy.visit("http://localhost:3000/searchhotelresult");
    cy.wait(2500);
    cy.get("#select_hotel").click(); 
    cy.url().should('include', '/viewhotel')//ensure navigate form search hotel result page
  });


  it("views ViewHotel page", () => {
    console.log(JSON.parse(localStorage.getItem("HOTEL_DETAILS")));
    cy.get("h4.card-title").should("exist"); // ensure api load data
    cy.contains('Hotel Overview').should("exist");
    cy.contains("Amenities").should("exist");
    cy.contains("Hotel Reviews").should("exist");
    cy.contains("Hotel Location").should("exist");
    cy.contains("Available Rooms").should("exist");
    cy.get('[data-cy = "image slides"]').should("exist");
    cy.get('[data-cy = "star rating"]').should("exist");

    cy.wait(1000);
    const data = JSON.parse(localStorage.getItem("HOTEL_DETAILS"));
    cy.contains(data.name).should("exist");
    cy.contains(data.address).should("exist");
    cy.get('[data-cy = "rooms"]').should("exist");
    
    // cy.request("https://d2ey9sqrvkqdfs.cloudfront.net/eqUd/0.jpg") // ensure api is returning the image
    //   .its("status")
    //   .should("eq", 200);

    // cy.get("div[style='width: 70rem; height: 25rem;']")
    //   .find("div")
    //   .eq(5)
    //   .should("have.css", "background-image")
    //   .and("include", "https://d2ey9sqrvkqdfs.cloudfront.net/eqUd/0.jpg"); // ensure image loaded in ImageSlider

  });

  it("interacts with links", () => {
    const hrefTagsLoc = ["Show on map", "View reviews", "View room options"];
    const hrefTags = ["#location", "#reviews", "#rooms"];
    for (let i = 0; i < hrefTags.length; i++) {
      cy.contains(hrefTagsLoc[i])
        .click()
        .should("have.attr", "href", hrefTags[i])
        .go("back");
      cy.wait(500);
    }
  });

  it("clicks on buttons", () => {
    var imageval = null;
    // click right button
    cy.get('[data-cy = "image"]').invoke("css", "background-image").then(yielded =>  {
      
      console.log(yielded);
      cy.get(
        '[data-cy = "right arrow"]'
      )
        .click()
      cy.get('[data-cy = "image"]').invoke("css", "background-image")
        .should('not.equal', yielded);
      
      // click left button
      cy.get(
        '[data-cy = "left arrow"]'
      )
        .click()
      cy.get('[data-cy = "image"]').invoke("css", "background-image")
        .should('equal', yielded);
        
      })
    // console.log(init_image);
    
    

    // cy.request("https://d2ey9sqrvkqdfs.cloudfront.net/eqUd/0.jpg")
    //   .its("status")
    //   .should("eq", 200);
    // cy.get("div[style='width: 70rem; height: 25rem;']")
    //   .find("div")
    //   .eq(5)
    //   .should("have.css", "background-image")
    //   .and("include", "https://d2ey9sqrvkqdfs.cloudfront.net/eqUd/0.jpg"); // correct image

    cy.contains("View room options").scrollIntoView().click();
    cy.contains("Book Hotel").should("be.visible");
  });

  it("logs in and books a hotel room", () => {
    cy.contains("Book Hotel").scrollIntoView().click();
    cy.wait(500);
    cy.contains("Go to Login/Register").click();
    cy.location("pathname").should("eq", "/login");
    cy.wait(500);

    // at login page
    cy.get("#email").type("registeroup@gmail.com");
    cy.get("#pw").type("123qwe");
    cy.contains("Submit").click();
    cy.location("pathname").should("eq", "/viewhotel");
    cy.wait(500);

    cy.contains("Book Hotel").scrollIntoView().click();
    cy.location("pathname").should("eq", "/custinfo");
  });
});
