import { defineConfig } from 'cypress'

module.exports = defineConfig({
    e2e: {
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },
    },
    env: {
        'SIGN-UP-FOR-KEY': '',
    },
    video: false,
})
