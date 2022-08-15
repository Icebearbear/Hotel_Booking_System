describe('Login Test', () => {
  it('Visits the Search Destination page to login', () => {
    // Initial loading of page and generate form
    cy.visit('http://localhost:3000/searchhotel');
    cy.viewport(900, 800);
    cy.get("#form").should("exist");
    cy.get("#dropdown").should("exist");

    // click to login page
    cy.contains('Login').click();
    cy.url().should('include', '/login');
    cy.get("#login_form").should("exist");
    
    // Misuse 1, empty fields submit
    cy.get("#submit").click();
    cy.contains("invalid email");
    cy.url().should('include', '/login');

    // Misuse 2, invalid email
    cy.get("#email").type('notaemail');
    cy.contains("invalid email");

    // correct email , Misuse 3 invalid password
    cy.get("#email").clear().type('registeroup@gmail.com');
    cy.get("#pw").type('wrongpassword');
    cy.get("#submit").click();
    cy.contains("wrong password");
    cy.url().should('include', '/login');

    // correct password and login, back to search page
    cy.get("#pw").type('123qwe');
    cy.get("#submit").click();
    cy.url().should('include', '/searchhotel');

    // view profile, logout , back to search page
    cy.contains('User Profile').click();
    cy.url().should('include', '/userspage');
    cy.contains('Logout').click();
    cy.url().should('include', '/searchhotel');

  })
})
