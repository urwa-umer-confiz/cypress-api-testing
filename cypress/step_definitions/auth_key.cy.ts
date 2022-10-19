import { Given } from '@badeball/cypress-cucumber-preprocessor'

Given('I add correct auth key', () => {
    Cypress.env('token_key', Cypress.env('SIGN-UP-FOR-KEY'))
})

Given('I add empty auth key', () => {
    Cypress.env('token_key', '')
})

Given('I add wrong auth key', () => {
    Cypress.env('token_key', '62333328d7msh4f')
})
