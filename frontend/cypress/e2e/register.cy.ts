/// <reference types = "cypress" />
 
describe("Registers a user", () => {
    it ("passes", () => {
        cy.visit('http://localhost:4200/register')

        cy.get('[data-cy="userName"]').type('Sammy')
        cy.get('[data-cy="email"]').type('jsammy@gmail.com')
        cy.get('[data-cy="password"]').type('123456789')
 
       
        cy.get('[data-cy="submit-button"]').click()
 
        cy.visit('http://localhost:4200/login')
       

    })
})