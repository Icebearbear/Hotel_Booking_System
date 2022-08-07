// describe('empty spec', () => {
//   it('passes', () => {
//     cy.visit('https://example.cypress.io')
//   })
// })

describe("Feature 1", () => {
  it("Visits the Search Destination page", () => {
    // Initial loading of page and generate form
    cy.visit("http://localhost:3000/searchhotel");
    cy.viewport(900, 800);
    cy.get("#form").should("exist");
    cy.get("#dropdown").should("exist");

    // Misuse 1, No destination, ensure that page does not change
    cy.get("#submit").click();
    cy.url().should("not.contain", "/searchhotelresult");
    // Misuse 2, Fill up Destination dropdown with spelling mistake
    cy.get("#dropdown").type("amstrdm");
    cy.contains("Amsterdam, Netherlands").click();
    // Misuse 3, No dates selected and try to submit
    cy.get("#submit").click();
    cy.url().should("not.contain", "/searchhotelresult");
    cy.get("#startdate").click();
    cy.contains("24").click();
    cy.get("#submit").click();
    cy.url().should("not.contain", "/searchhotelresult");

    // Fill up the other fields, replace default values
    cy.get("#rooms").select("2");
    cy.get("#childs").select("2");
    cy.get("#startdate").click();
    // testing datepicker by clicking
    cy.contains("25").click();
    // Misuse 4, typing invalid dates (past dates)
    cy.get("#enddate").type("15/01/2020");
    cy.contains("Page").click();
    cy.get("#submit").click();
    cy.url().should("not.contain", "/searchhotelresult");
    // Correct Date
    cy.get("#enddate").type("28/08/2022");

    // Fields completed, submit to results page
    cy.get("#submit").click();
    cy.url().should("include", "/searchhotelresult");
  });
});
