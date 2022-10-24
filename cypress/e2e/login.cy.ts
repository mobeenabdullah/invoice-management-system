describe("renders the login page", () => {
  it("rendered correctly", () => {
    cy.visit("http://localhost:3000/login");
    cy.get('[data-test="email"]');
    cy.get('[data-test="submit-login"]').click()
    cy.get('[data-test="email-error"]').should('contain', 'Email is required!');
    cy.get('[data-test="email"]').type('jhondoe.com');
    cy.get('[data-test="submit-login"]').click()
    cy.get('[data-test="email-error"]').should('contain', 'Email format is inValid!');
    cy.get('[data-test="email"]').clear();
    cy.get('[data-test="email"]').type('jhondoe1@jhon.com');
    cy.get('[data-test="submit-login"]').click();
    cy.get('[data-test="password-error"]').should('contain', 'Password Must be 6 Character Long!');
    cy.get('[data-test="password"]').type('123');
    cy.get('[data-test="submit-login"]').click();
    cy.get('[data-test="password-error"]').should('contain', 'Password Must be 6 Character Long!');
    cy.get('[data-test="password"]').type('jhondoe');
    cy.get('[data-test="submit-login"]').click();
    // cy.get(':button').should('be.disabled')    
  });
});
