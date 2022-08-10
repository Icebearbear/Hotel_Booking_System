describe("User looking at the hotel page", () => {
  // set up
  const hotelId = "eqUd";
  const passData = {
    destination_id: "RsBU",
    checkin: "2022-08-28",
    checkout: "2022-09-01",
    lang: "en_US",
    currency: "SGD",
    rooms: "1",
    adults: "2",
    childs: "1",
    guests: null,
    partner_id: "1",
  };
  const hotelData = {
    id: "eqUd",
    imageCount: 36,
    latitude: 1.2905375957489,
    longitude: 103.835029602051,
    name: "Grand Copthorne Waterfront",
    address: "392 Havelock Road",
    address1: "392 Havelock Road",
    rating: 5.0,
    amenities_ratings: 
    [{ name: "Location", score: 87 }, { name: "Comfort", score: 84 }, { name: "Service", score: 84 }, { name: "Room", score: 77 }, { name: "WiFi", score: 71 }, { name: "Food", score: 68 }, { name: "Vibe", score: 50 }], 
    description: "Property Location<br/>With a stay at Grand Copthorne Waterfront Hotel Singapore, you'll be centrally located in Singapore, convenient to Great World City Mall and Chinatown Heritage Center. This 4-star hotel is close to National Orchid Garden and Universal Studios Singapore.<br/>Rooms<br/>Make yourself at home in one of the 574 air-conditioned rooms featuring minibars. Pay movies provides entertainment, and wired and wireless Internet access is available for a surcharge. Bathrooms feature shower/tub combinations, makeup/shaving mirrors, and complimentary toiletries. Conveniences include safes and desks, and housekeeping is provided daily.<br/>Rec, Spa, Premium Amenities<br/>Pamper yourself with a visit to the spa, which offers massages and facials. You can take advantage of recreational amenities such as an outdoor pool and a fitness facility. This hotel also features wireless Internet access (surcharge), a hair salon, and wedding services. Getting to nearby attractions is a breeze with the area shuttle (surcharge).<br/>Dining<br/>Enjoy a meal at a restaurant or in a coffee shop/café. Or stay in and take advantage of the hotel's 24-hour room service. Relax with your favorite drink at a bar/lounge or a poolside bar.<br/>Business, Other Amenities<br/>Featured amenities include a business center, limo/town car service, and audiovisual equipment. Event facilities at this hotel consist of conference/meeting rooms, small meeting rooms, and a ballroom. A roundtrip airport shuttle is provided for a surcharge, and free parking is available onsite.", 
    amenities: { airConditioning: true, businessCenter: true, clothingIron: true, dryCleaning: true, hairDryer: true, meetingRooms: true, miniBarInRoom: true, outdoorPool: true, parkingGarage: true, roomService: true, safe: true, tennisCourt: true, voiceMail: true }, 
    image_details: { suffix: ".jpg", count: 36, prefix: "https://d2ey9sqrvkqdfs.cloudfront.net/eqUd/" }, 
    number_of_images: 182, 
    default_image_index: 1, 
    imgix_url: "https://kaligo-web-expedia.imgix.net", 
    cloudflare_image_url: "https://www.kaligo-staging.xyz/images/new",
    imgUrl: ["https://d2ey9sqrvkqdfs.cloudfront.net/eqUd/0.jpg", "https://d2ey9sqrvkqdfs.cloudfront.net/eqUd/1.jpg"]
  }


  beforeEach(() => {
    cy.viewport(1280, 720);
    localStorage.setItem("HOTEL_ID", hotelId);
    localStorage.setItem("HOTEL_DETAILS", JSON.stringify(hotelData));
    localStorage.setItem("SEARCH_DATA", JSON.stringify(passData));
    localStorage.setItem("LOGIN", false);

    cy.visit("http://localhost:3000/viewhotel");
    cy.wait(1500);
  });

  // it("views ViewHotel page", () => {
  //   cy.get("h4.card-title").should("contain", "Grand Copthorne Waterfront"); // ensure api load data
  //   cy.request("https://d2ey9sqrvkqdfs.cloudfront.net/eqUd/0.jpg") // ensure api is returning the image
  //     .its("status")
  //     .should("eq", 200);

  //   cy.get("div[style='width: 103%; height: 100%; position: relative;']")
  //     .find("div")
  //     .eq(2)
  //     .should("have.css", "background-image")
  //     .and("include", "https://d2ey9sqrvkqdfs.cloudfront.net/eqUd/0.jpg"); // ensure image loaded in ImageSlider
  // });

  // it("interacts with links", () => {
  //   const hrefTagsLoc = ["Show on map", "View reviews", "View room options"];
  //   const hrefTags = ["#location", "#reviews", "#rooms"];
  //   for (let i = 0; i < hrefTags.length; i++) {
  //     cy.contains(hrefTagsLoc[i])
  //       .click()
  //       .should("have.attr", "href", hrefTags[i])
  //       .go("back");
  //     cy.wait(500);
  //   }
  // });

  // it("clicks on buttons", () => {
  //   // click right button
  //   cy.get(
  //     "div[style='position: absolute; top: 50%; transform: translate(0px, -50%); right: 32px; font-size: 45px; color: rgb(255, 255, 255); z-index: 1; cursor: pointer;']"
  //   )
  //     .click()
  //     .should("have.css", "background-image");
  //   cy.request("https://d2ey9sqrvkqdfs.cloudfront.net/eqUd/1.jpg")
  //     .its("status")
  //     .should("eq", 200);
  //   cy.get("div[style='width: 103%; height: 100%; position: relative;']")
  //     .find("div")
  //     .eq(2)
  //     .should("have.css", "background-image")
  //     .and("include", "https://d2ey9sqrvkqdfs.cloudfront.net/eqUd/1.jpg"); // correct image
  //   // click left button
  //   cy.get(
  //     "div[style='position: absolute; top: 50%; transform: translate(0px, -50%); left: 32px; font-size: 45px; color: rgb(255, 255, 255); z-index: 1; cursor: pointer;']"
  //   )
  //     .click()
  //     .should("have.css", "background-image");
  //   cy.request("https://d2ey9sqrvkqdfs.cloudfront.net/eqUd/0.jpg")
  //     .its("status")
  //     .should("eq", 200);
  //   cy.get("div[style='width: 103%; height: 100%; position: relative;']")
  //     .find("div")
  //     .eq(2)
  //     .should("have.css", "background-image")
  //     .and("include", "https://d2ey9sqrvkqdfs.cloudfront.net/eqUd/0.jpg"); // correct image

  //   cy.get("button.btn.btn-light").eq(0).click();
  //   cy.contains("Room details").should("be.visible");
  //   cy.contains("Book Hotel").scrollIntoView().should("be.visible");
  // });

  it("logs in and books a hotel room", () => {
    cy.contains("Book Hotel").scrollIntoView().click();
    cy.wait(500);
    cy.contains("Back").click();
    cy.scrollTo(0, 0);
    cy.wait(500);
    cy.get("button.btn.btn-warning").scrollIntoView().click();
    cy.location("pathname").should("eq", "/login");
    cy.wait(500);

    // at login page
    cy.get("#formBasicEmail").type("testone@gmail.com");
    cy.get("#formBasicPassword").type("123456");
    cy.contains("Submit").click();
    cy.location("pathname").should("eq", "/viewhotel");
    cy.wait(500);

    cy.contains("Book Hotel").scrollIntoView().click();
    cy.location("pathname").should("eq", "/custinfo");
  });
});