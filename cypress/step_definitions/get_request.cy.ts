import { When } from '@badeball/cypress-cucumber-preprocessor'

When('I send the GET request with {} and {}', (url: string, test_data: string) => {
    let qs: object = {}

    if (test_data.includes('.json')) {
        cy.fixture('' + test_data).then((data) => {
            qs = data

            cy.request({
                method: 'GET',
                url: url,
                failOnStatusCode: false,
                auth: {
                    bearer: Cypress.env('token_key'),
                },
                headers: {
                    'X-RapidAPI-Key': Cypress.env('token_key'),
                    'X-RapidAPI-Host': 'tasty.p.rapidapi.com',
                },
                qs,
            }).as('api_response')
        })
    } else {
        qs = JSON.parse(test_data)

        cy.request({
            method: 'GET',
            url: url,
            failOnStatusCode: false,
            auth: {
                bearer: Cypress.env('token_key'),
            },
            headers: {
                'X-RapidAPI-Key': Cypress.env('token_key'),
                'X-RapidAPI-Host': 'tasty.p.rapidapi.com',
            },
            qs,
        }).as('api_response')
    }
})
