import { defineConfig } from 'cypress'

const createBundler = require('@bahmutov/cypress-esbuild-preprocessor')
const addCucumberPreprocessorPlugin =
    require('@badeball/cypress-cucumber-preprocessor').addCucumberPreprocessorPlugin
const createEsbuildPlugin =
    require('@badeball/cypress-cucumber-preprocessor/esbuild').createEsbuildPlugin

export default defineConfig({
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
        async setupNodeEvents(on, config) {
            // `on` is used to hook into various events Cypress emits
            // `config` is the resolved Cypress config

            const bundler = createBundler({
                plugins: [createEsbuildPlugin(config)],
            })

            on('file:preprocessor', bundler)
            await addCucumberPreprocessorPlugin(on, config)

            require('cypress-mochawesome-reporter/plugin')(on)

            return config
        },
        env: {
            'SIGN-UP-FOR-KEY': '',
        },
        baseUrl: 'https://tasty.p.rapidapi.com',
        specPattern: 'cypress/e2e/**/*.feature',
        video: false,
    },
})
