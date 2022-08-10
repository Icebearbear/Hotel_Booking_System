describe('Feature 2', () => {
  it('Visits the Search results page', () => {
    cy.visit('http://localhost:3000/searchhotelresult');
    // without any search params, error msg and redirect user to search page
    cy.contains('Error');
    cy.get('#redirect').click();
    cy.url().should('not.contain', '/searchhotelresult');
    cy.url().should('include', '/');

    //fill up search form and submit to feat 2
    cy.get('#dropdown').type("amsterdam");
    cy.contains("Amsterdam, Netherlands").click();
    cy.get("#rooms").select("2");
    cy.get("#guestperroom").select("3");
    cy.get("#startdate").click();
    cy.contains("25").click();
    cy.get("#enddate").click();
    cy.contains("28").click();
    cy.get("#submit").click();

    // Back to Search Hotel Results page
    cy.url().should('include', '/searchhotelresult');
    cy.get("#hotel_results").should("exist");
    // ensure all hotel details loaded
    cy.get("#price",{timeout: 60000});
    //cy.contains("Price" , {timeout: 60000});
    cy.get("#starRating");
    cy.get("#address");
    // Check All Hotels are shown
    

    // Scroll down end load all results, lazy loading
    cy.get('div#hotel_card').should('have.length', 10);
    cy.get('div#hotel_content').should('have.length', 10);
    cy.scrollTo('bottom');
    cy.wait(3000);
    cy.get('div#hotel_card', {timeout: 60000}).should('have.length', 20);
    cy.get('div#hotel_content').should('have.length', 20);
    cy.scrollTo('bottom');
    // get total number of hotels from api
    
    // cy.get('#hotel_results')
    // .invoke('text')
    // .then((s) => {
    //   const start = s.indexOf(':')
    //   const end = start + 6;
    //   return s.slice(start + 2, end)
    // })
    // .then(cy.log)
    // .then(parseInt).then((hotel_size)=>{
    //   cy.get('div#hotel_card', {timeout: 60000}).should('have.length', hotel_size);
    //   cy.get('div#hotel_content').should('have.length', hotel_size);
    // })

    cy.get("#select_hotel").click();
    cy.url().should('include', '/viewhotel')

  })
})