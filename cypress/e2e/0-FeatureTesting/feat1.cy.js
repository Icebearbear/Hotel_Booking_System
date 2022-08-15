// describe('empty spec', () => {
//   it('passes', () => {
//     cy.visit('https://example.cypress.io')
//   })
// })

describe('Feature 1', () => {
  beforeEach(() => {
    // Initial loading of page and generate form
    cy.visit('http://localhost:3000/searchhotel');
  })

  it('Checks that everything is rendered', () =>{
    cy.get("#form").then(()=>{
      cy.get('[data-cy="search destination"]').should("exist");
      // cy.contains('[data-cy = "search destination"]');
      cy.get('[data-testid="combobox-rooms"]').should("exist");
      cy.get('[data-testid="combobox-adultsy"]').should("exist");
      cy.get("#startdate").should("exist");
      cy.get("#enddate").should("exist");
      cy.contains("Search hotel").should("exist");
    })
  })


  it('Tests inputs', () => {
    //cy.viewport(900, 1000);
    cy.get("#form").should("exist");
    cy.get("#dropdown").should("exist");

    // Misuse 1, No destination, ensure that page does not change
    cy.get("#submit").click();
    cy.url().should('not.contain', '/searchhotelresult');
    // Misuse 2, Fill up Destination dropdown with spelling mistake
    cy.get('#dropdown').type("amstrdm");
    cy.contains("Amsterdam, Netherlands").click();
    // Misuse 3, No dates selected and try to submit
    cy.get("#submit").click();
    cy.url().should('not.contain', '/searchhotelresult');
    cy.get("#startdate").click();
    cy.contains("24").click();
    cy.get("#submit").click();
    cy.url().should('not.contain', '/searchhotelresult');

    // Fill up the other fields, replace default values
    cy.get("#rooms").select("2");
    cy.get('[data-testid="combobox-adults"]').eq(1).select("3");
    cy.get("#startdate").click();
    // testing datepicker by clicking
    cy.contains("25").click();
    // Misuse 4, typing invalid dates (past dates)
    cy.get("#enddate").type("28/08/2022");
    cy.get("#startdate").click();
    cy.contains("30").click();
    cy.on('window:alert', (text) => {
      expect(text).to.contains('please select a date before the selected end date.');
    });
    // Correct Date
    
    // Fields completed, submit to results page
    cy.get("#submit").click();
    cy.url().should('include', '/searchhotelresult');
    cy.contains("Amsterdam, Netherlands").should("exist");
    cy.contains("2022-8-25").should("exist");
    cy.contains("2022-8-28").should("exist");
    cy.contains("1|3").should("exist");
  })
})