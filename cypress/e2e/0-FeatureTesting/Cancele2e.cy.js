describe("User looking at the hotel page", () => {

    beforeEach(() => {
        cy.viewport(1280, 720);
        // arrange
        cy.visit("http://localhost:3000/cancel");
        cy.wait(1000);
      });

    it("load page",() => {
        cy.contains("Oh! You have cancelled the checkout!").should("be.visible");
        cy.get("button.d-flex.justify-content-end.btn.btn-outline-danger").click();
        cy.wait(1000);
        cy.location("pathname").should("eq", "/searchhotel");
    })

})