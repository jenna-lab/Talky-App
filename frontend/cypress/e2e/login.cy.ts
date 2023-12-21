/// <reference types = "cypress" />
 
describe("Logs in a user", () => {
    it ("passes", () => {
        cy.visit('http://localhost:4200/login')

        cy.get('[data-cy="email"]').type('jsammy@gmail.com')
        cy.get('[data-cy="password"]').type('123456789')
 
       
        cy.get('[data-cy="submit-button"]').click()
 
        cy.visit('http://localhost:4200/user')
       

    })
})