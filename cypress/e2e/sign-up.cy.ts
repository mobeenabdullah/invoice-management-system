describe("renders the sign up page", () => {
    it("rendered correctly", () => {
        cy.visit("http://localhost:3000/sign-up");
        cy.get('[data-test="name"]');
        cy.get('button').click();
        cy.get('[data-test="name-error"]').should('contain', 'Name is required!');
        cy.get('[data-test="name"]').type('Jhon Doe');
        cy.get('button').click()
        cy.get('[data-test="email-error"]').should('contain', 'Email is required!');
        cy.get('[data-test="email"]').type('test.com');
        cy.get('button').click()
        cy.get('[data-test="email-error"]').should('contain', 'Email format is invalid!');
        cy.get('[data-test="email"]').clear();
        cy.get('[data-test="email"]').type('jhondoe@jhon.com');
        cy.get('button').click();
        cy.get('[data-test="password-error"]').should('contain', 'Password Must be 5-16 Character Long!');
        cy.get('[data-test="password"]').type('123');
        cy.get('button').click();
        cy.get('[data-test="password-error"]').should('contain', 'Password Must be 5-16 Character Long!');
        cy.get('[data-test="password"]').clear();
        cy.get('[data-test="password"]').type('jhondoe');
        cy.get('button').click();
        cy.get('[data-test="confirm-password-error"]').should('contain', 'Password not match!');
        cy.get('[data-test="confirm-password"]').type('123795');
        cy.get('button').click();
        cy.get('[data-test="confirm-password-error"]').should('contain', 'Password not match!');
        cy.get('[data-test="confirm-password"]').clear();
        cy.get('[data-test="confirm-password"]').type('jhondoe');
        cy.get('button').click();   
        cy.get(':button').should('be.disabled')  
    });
});
