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
        localStorage.setItem("HOTEL_ID", hotelId);
        localStorage.setItem("HOTEL_LOC", JSON.stringify(hotelLocation));
        localStorage.setItem("SEARCH_DATA", JSON.stringify(passData));

        cy.visit('http://localhost:3000/viewhotel');
        cy.wait(2500);
      })

    it('views ViewHotel page', () => {
        cy.get('h2.card-title')
            .should('contain', 'Grand Copthorne Waterfront') // ensure it contains the text
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
        cy.contains('View rooms').scrollIntoView()
            .click()

        cy.contains('Book your room').scrollIntoView()
            .should('be.visible')
    })

    it('logs in and books a hotel room', () => {
        cy.visit('http://localhost:3000/viewhotel');
        cy.wait(2000);
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
        cy.contains('Submit')
            .click()
        cy.location('pathname').should('eq', '/viewhotel')
            cy.wait(500);
        
        cy.contains('Book your room').scrollIntoView()
            .click()
        cy.location('pathname').should('eq', '/custinfo')
    })
})