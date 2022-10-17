describe('testing the Tasty APIs', () => {
    it('tests the recipes/auto-complete API with valid data', () => {
        cy.request({
            method: 'GET',
            url: 'https://tasty.p.rapidapi.com/recipes/auto-complete',
            headers: {
                'X-RapidAPI-Key': Cypress.env('SIGN-UP-FOR-KEY'),
                'X-RapidAPI-Host': 'tasty.p.rapidapi.com',
            },
            qs: { prefix: 'chicken soup' },
        }).as('response')

        cy.get('@response').its('status').should('equal', 200)
        cy.get('@response').its('body').should('have.a.property', 'results')
    })

    it('tests the recipes/list API with valid data', () => {
        cy.request({
            method: 'GET',
            url: 'https://tasty.p.rapidapi.com/recipes/list',
            headers: {
                'X-RapidAPI-Key': Cypress.env('SIGN-UP-FOR-KEY'),
                'X-RapidAPI-Host': 'tasty.p.rapidapi.com',
            },
            qs: { from: '0', size: '20', tags: 'under_30_minutes' },
        }).as('response')

        cy.get('@response').its('status').should('equal', 200)
        cy.get('@response').its('body').should('have.a.property', 'results')
    })

    it('tests the recipes/list-similarities API with valid data', () => {
        cy.request({
            method: 'GET',
            url: 'https://tasty.p.rapidapi.com/recipes/list-similarities',
            headers: {
                'X-RapidAPI-Key': Cypress.env('SIGN-UP-FOR-KEY'),
                'X-RapidAPI-Host': 'tasty.p.rapidapi.com',
            },
            qs: { recipe_id: '8138' },
        }).as('response')

        cy.get('@response').its('status').should('equal', 200)
        cy.get('@response').its('body').should('have.a.property', 'results')
    })

    it('tests the recipes/get-more-info API with valid data', () => {
        cy.request({
            method: 'GET',
            url: 'https://tasty.p.rapidapi.com/recipes/get-more-info',
            headers: {
                'X-RapidAPI-Key': Cypress.env('SIGN-UP-FOR-KEY'),
                'X-RapidAPI-Host': 'tasty.p.rapidapi.com',
            },
            qs: { id: '8138' },
        }).as('response')

        cy.log('@response')
        cy.get('@response').its('status').should('equal', 200)
    })

    it('tests the tips/list API with valid data', () => {
        cy.request({
            method: 'GET',
            url: 'https://tasty.p.rapidapi.com/tips/list',
            headers: {
                'X-RapidAPI-Key': Cypress.env('SIGN-UP-FOR-KEY'),
                'X-RapidAPI-Host': 'tasty.p.rapidapi.com',
            },
            qs: { id: '3562', from: '0', size: '30' },
        }).as('response')

        cy.get('@response').its('status').should('equal', 200)
        cy.get('@response').its('body').should('have.a.property', 'results')
    })

    it('tests the feeds/list API with valid data', () => {
        cy.request({
            method: 'GET',
            url: 'https://tasty.p.rapidapi.com/feeds/list',
            headers: {
                'X-RapidAPI-Key': Cypress.env('SIGN-UP-FOR-KEY'),
                'X-RapidAPI-Host': 'tasty.p.rapidapi.com',
            },
            qs: {
                size: '5',
                timezone: '+0700',
                vegetarian: 'false',
                from: '0',
            },
        }).as('response')

        cy.get('@response').its('status').should('equal', 200)
        cy.get('@response').its('body').should('have.a.property', 'results')
    })
})
