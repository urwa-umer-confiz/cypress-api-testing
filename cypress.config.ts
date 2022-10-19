import { defineConfig } from 'cypress'

module.exports = defineConfig({
    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
        charts: true,
        reportPageTitle: 'flooss-api-test-report',
        embeddedScreenshots: true,
        inlineAssets: true,
        saveAllAttempts: false,
        code: false,
    },
    e2e: {
        setupNodeEvents(on, config) {
            // implement node event listeners here
            require('cypress-mochawesome-reporter/plugin')(on)
        },
    },
    env: {
        'SIGN-UP-FOR-KEY': '',
    },
    video: false,
})
