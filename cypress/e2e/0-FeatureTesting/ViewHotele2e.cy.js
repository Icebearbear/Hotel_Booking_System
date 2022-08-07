describe('User looking at the hotel page', () => {
    // set up
    const hotelId = "eqUd";
    const hotelLocation = {
        latitude: 1.2905375957489,
        longitude: 103.835029602051
    };
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

    beforeEach(() => {
        cy.viewport(1280, 720)
        localStorage.setItem("LOGIN", false);
        localStorage.setItem("HOTEL_ID", hotelId);
        localStorage.setItem("HOTEL_LOC", JSON.stringify(hotelLocation));
        localStorage.setItem("SEARCH_DATA", JSON.stringify(passData));

        cy.visit('http://localhost:3000/viewhotel');
        cy.wait(2500);
    })

    it('views ViewHotel page', () => {
        cy.get('h2.card-title')
            .should('contain', 'Grand Copthorne Waterfront') // ensure api load data
        cy.request("https://d2ey9sqrvkqdfs.cloudfront.net/eqUd/0.jpg") // ensure api is returning the image
            .its('status').should('eq', 200);

        cy.get("div[style='width: 70rem; height: 25rem;']")
            .find("div").eq(5)
            .should('have.css', 'background-image')
            .and('include', 'https://d2ey9sqrvkqdfs.cloudfront.net/eqUd/0.jpg'); // ensure image loaded in ImageSlider
    })

    it('interacts with links', () => {
        const hrefTagsLoc = ['Show on map', 'View reviews', 'View room options']
        const hrefTags = ['#location', "#reviews", "#rooms"]
        for (let i = 0; i < hrefTags.length; i++) {
            cy.contains(hrefTagsLoc[i])
                .click()
                .should("have.attr", "href", hrefTags[i])
                .go("back");
            cy.wait(500);
        }
    })

    it('clicks on buttons', () => {
        // click right button
        cy.get("div[style='position: absolute; top: 50%; transform: translate(0px, -50%); right: 32px; font-size: 45px; color: rgb(255, 255, 255); z-index: 1; cursor: pointer;']").click()
            .should('have.css', 'background-image')
        cy.request("https://d2ey9sqrvkqdfs.cloudfront.net/eqUd/1.jpg")
            .its('status').should('eq', 200);
        cy.get("div[style='width: 70rem; height: 25rem;']")
            .find("div").eq(5)
            .should('have.css', 'background-image')
            .and('include', 'https://d2ey9sqrvkqdfs.cloudfront.net/eqUd/1.jpg');  // correct image
        // click left button
        cy.get("div[style='position: absolute; top: 50%; transform: translate(0px, -50%); left: 32px; font-size: 45px; color: rgb(255, 255, 255); z-index: 1; cursor: pointer;']").click()
            .should('have.css', 'background-image')
        cy.request("https://d2ey9sqrvkqdfs.cloudfront.net/eqUd/0.jpg")
            .its('status').should('eq', 200);
        cy.get("div[style='width: 70rem; height: 25rem;']")
            .find("div").eq(5)
            .should('have.css', 'background-image')
            .and('include', 'https://d2ey9sqrvkqdfs.cloudfront.net/eqUd/0.jpg');  // correct image

        cy.contains('View rooms').scrollIntoView()
            .click()
        cy.contains('Book your room').scrollIntoView()
            .should('be.visible')
    })

    it('logs in and books a hotel room', () => {
        cy.contains('View rooms').scrollIntoView()
            .click()
        cy.contains('Book your room').scrollIntoView()
            .click()
        cy.wait(500);
        cy.contains('Back')
            .click()
        cy.contains('Login/Register').scrollIntoView()
            .click()
        cy.location('pathname').should('eq', '/login')
        cy.wait(500);

        // at login page
        cy.get('#formBasicEmail').type("testone@gmail.com")
        cy.get('#formBasicPassword').type("123456")
        // cy.get("input[placeholder='Enter email']").type("testone@gmail.com")
        // cy.get("input[placeholder='Password']").type("123456")
        cy.contains('Submit')
            .click()
        cy.wait(500);
        cy.location('pathname').should('eq', '/viewhotel')
        cy.wait(500);

        cy.contains('Book your room').scrollIntoView()
            .click()
        cy.wait(10000);
        cy.location('pathname').should('eq', '/custinfo')
    })
})