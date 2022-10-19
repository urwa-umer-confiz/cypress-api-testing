import { Then } from '@badeball/cypress-cucumber-preprocessor'

Then('I should see {} response code', (code: string) => {
    if (code == '2xx') {
        cy.get('@api_response').its('status').should('be.oneOf', [200, 201])
    } else if (code == '4xx') {
        cy.get('@api_response')
            .its('status')
            .should('be.oneOf', [400, 401, 403, 429])
    }
})

Then('I should see {} in response', (content: string) => {
    if (content != '') {
        cy.get('@api_response').its('body').should('have.a.property', content)
    }
})
