# cypress-api-testing

This project is created for learning the API automation using the Cypress.

## Table of Contents

- [cypress-api-testing](#cypress-api-testing)
  - [Table of Contents](#table-of-contents)
  - [Technologies](#technologies)
  - [Test Target Application](#test-target-application)
  - [Project Status](#project-status)
  - [Room of Improvement](#room-of-improvement)
  - [Setup](#setup)
    - [Project Setup from Github](#project-setup-from-github)
    - [Project Setup from Start](#project-setup-from-start)
      - [1- Installing NodeJS](#1--installing-nodejs)
      - [2- Installing Cypress](#2--installing-cypress)
      - [3- Installing Typescript](#3--installing-typescript)
      - [4- Installing Cypress Cucumber Preprocessor plugin](#4--installing-cypress-cucumber-preprocessor-plugin)
  - [Run Commands](#run-commands)
  - [Code Examples](#code-examples)
    - [Code Example of Cypress Request](#code-example-of-cypress-request)
  - [Cypress Request](#cypress-request)
  - [Code Style and Formatting](#code-style-and-formatting)
    - [Test File (.ts)](#test-file-ts)
    - [Feature File (.feature)](#feature-file-feature)
  - [Folder and File Structure](#folder-and-file-structure)
  - [Tags](#tags)
  - [Helping Materials](#helping-materials)

## Technologies

Project is created with:

-   Language: Javascript, Typescript
-   Framework: Cypress
-   Runtime Environment: NodeJS

## Test Target Application

-   [Tasty APIs](https://rapidapi.com/apidojo/api/tasty)

## Project Status

-   The project is at **Initial** development stage

## Room of Improvement

-   [ ] Add Reporting plugin

## Setup

### Project Setup from Github

1. Clone the project from the Github Repository

2. Open the project in VS code

3. Write this command in the terminal

    ```bash
    npm install
    ```

4. Create a new file in root

5. Name the file: cypress.env.json

6. Add the credentials of the user for which auth key needs to be generated like this:

    ```json
    {
        "SIGN-UP-FOR-KEY": "Enter the RapidAPI key here"
    }
    ```

7. Use this command to open Cypress interface

    ```bash
    npx cypress open
    ```

8. Enter this command to run the tests in headless mode

    ```bash
    npx cypress run
    ```

### Project Setup from Start

#### 1- Installing NodeJS

1. Install Node Js

    - https://nodejs.org/en/download/

2. Install npm

    ```bash
    npm install -g npm
    ```

3. Confirm installation

    ```bash
    node -v
    ```

    ```bash
    npm -v
    ```

4. Create a project directory

5. Open project folder in terminal. Run these command to create a cypress project

    ```bash
    npm init -y
    ```

#### 2- Installing Cypress

1. Run this command on the terminal

    ```bash
    npm install --save-dev cypress
    ```

2. To Open Cypress interface

    ```bash
    npx cypress open
    ```

#### 3- Installing Typescript

1. Run this command on the terminal

    ```bash
    npm install --save-dev typescript
    ```

2. Create tsconfig.json file

    ```json
    {
        "compilerOptions": {
            "lib": ["es5", "dom"],
            "types": ["cypress", "node"]
        },
        "include": ["**/*.ts"]
    }
    ```

3. Change commands.js and test files extension from .js files into .ts
4. Create index.d.ts file
5. Add the Cypress Commands created in commands.ts to index.d.ts as Chainable.

#### 4- Installing Cypress Cucumber Preprocessor plugin

1.  Install `@badeball/cypress-cucumber-preprocessor` and supporting dependencies.

    ```bash
    npm install --save-dev @badeball/cypress-cucumber-preprocessor
    ```

    ```bash
    npm install --save-dev @bahmutov/cypress-esbuild-preprocessor
    ```

    ```bash
    npm install --save-dev @cypress/browserify-preprocessor
    ```

2.  In cypress.config.ts

    ```typescript
    import { defineConfig } from 'cypress'

    const createBundler = require('@bahmutov/cypress-esbuild-preprocessor')
    const addCucumberPreprocessorPlugin = require('@badeball/cypress-cucumber-preprocessor').addCucumberPreprocessorPlugin
    const createEsbuildPlugin = require('@badeball/cypress-cucumber-preprocessor/esbuild').createEsbuildPlugin

    export default defineConfig({

        // other plugin configurations

    },
        e2e: {
            async setupNodeEvents(on, config) {
                const bundler = createBundler({
                    plugins: [createEsbuildPlugin(config)],
            })

            on('file:preprocessor', bundler)
            await addCucumberPreprocessorPlugin(on, config)
            return config
        },

        // other cypress configurations

        },
    })
    ```

3.  In cypress.config.ts

    ```typescript
    // add inside e2e object
    specPattern: 'cypress/e2e/**/*.feature',
    ```

4.  Create a new file in root directory with name of `.cypress-cucumber-preprocessorrc.json`
5.  Add following configuration in `.cypress-cucumber-preprocessorrc.json`

    ```json
    {
        "stepDefinitions": [
            "[filepath]/**/*.{js,ts}",
            "[filepath].{js,ts}",
            "cypress/step_definitions/*.{js,ts}",
            "[filepath]\\***.{js,ts}",
            "[filepath].{js,ts}",
            "cypress\\step_definitions\\*.{js,ts}"
        ]
    }
    ```

6.  In `cypress/e2e` folder add the `.feature` files
7.  In `cypress/step_definitions` folder add the `.cy.ts` files

## Run Commands

-   To run cypress

    ```bash
    npx cypress open
    ```

*   To run cypress headless

    ```bash
    npx cypress run
    ```

*   To run one spec file

    ```bash
    npx cypress run --spec cypress/e2e/file_name.feature
    ```

*   To run test with single tags which are defined on a feature file

    ```bash
    npx cypress run --env tags=@positive
    ```

*   To run test with multiple tags which are defined on a feature file

    ```bash
    npx cypress run --env tags="@positive or @negative"
    ```

## Code Examples

### Code Example of Cypress Request

A script for the simple test using cypress request to test the API getting the list of the blog posts.

```javascript
describe('Verify the response of the blog post API', () => {
    it.only('verify the response of the body with valid parameters', () => {
        cy.request({
            // API method type
            method: 'GET',
            // URL of the request
            url: 'https://jsonplaceholder.typicode.com/posts',
            // add parameters
            qs: {
                userId: 3,
            },
        }).then((response) => {
            // assertions
            expect(response).property('status').to.equal(200)
            expect(response.body).to.be.an('array')
            //assertion on array response
            response.body.forEach((post) => {
                expect(post).to.have.property('userId', 3)
                expect(post).to.have.property('id')
                expect(post).to.have.property('title')
                expect(post).to.have.property('body')
            })
        })
    })
})
```

## Cypress Request

Options available for the `cy.request()` or `cy.api()` in case of using the `cypress-plugin-api` plugin

| Option                     | Default                                                                               | Description                                                                                                                                                                                              |
| -------------------------- | ------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `log`                      | `true`                                                                                | Displays the command in the [Command log](https://docs.cypress.io/guides/core-concepts/test-runner#Command-Log)                                                                                          |
| `url`                      | `null`                                                                                | The URL to make the request to                                                                                                                                                                           |
| `method`                   | `GET`                                                                                 | The HTTP method to use in the request                                                                                                                                                                    |
| `auth`                     | `null`                                                                                | Adds Authorization headers. [Accepts these options.](https://github.com/request/request#http-authentication)                                                                                             |
| `body`                     | `null`                                                                                | Body to send along with the request                                                                                                                                                                      |
| `failOnStatusCode`         | `true`                                                                                | Whether to fail on response codes other than `2xx` and `3xx`                                                                                                                                             |
| `followRedirect`           | `true`                                                                                | Whether to automatically follow redirects                                                                                                                                                                |
| `form`                     | `false`                                                                               | Whether to convert the `body` values to URL encoded content and set the `x-www-form-urlencoded` header                                                                                                   |
| `encoding`                 | `utf8`                                                                                | The encoding to be used when serializing the response body. The following encodings are supported: `ascii`, `base64`, `binary`, `hex`, `latin1`, `utf8`, `utf-8`, `ucs2`, `ucs-2`, `utf16le`, `utf-16le` |
| `gzip`                     | `true`                                                                                | Whether to accept the `gzip` encoding                                                                                                                                                                    |
| `headers`                  | `null`                                                                                | Additional headers to send; Accepts object literal                                                                                                                                                       |
| `qs`                       | `null`                                                                                | Query parameters to append to the `url` of the request                                                                                                                                                   |
| `retryOnStatusCodeFailure` | `false`                                                                               | Whether Cypress should automatically retry status code errors under the hood. Cypress will retry a request up to 4 times if this is set to true.                                                         |
| `retryOnNetworkFailure`    | `true`                                                                                | Whether Cypress should automatically retry transient network errors under the hood. Cypress will retry a request up to 4 times if this is set to true.                                                   |
| `timeout`                  | [`responseTimeout`](https://docs.cypress.io/guides/references/configuration#Timeouts) | Time to wait for `cy.request()` to resolve before [timing out](https://docs.cypress.io/api/commands/request#Timeouts)                                                                                    |

## Code Style and Formatting

### Test File (.ts)

-   In cypress\step_definitions folder, save file as: `get_request.cy.ts`
-   Avoid using ; at the end of the line
-   Use the **arrow functions**
-   Use the **Types** for the variables created
-   Use **Prettier** formatter to format the file
-   **Prettier** configuration are added in `.prettierignore` file

### Feature File (.feature)

-   In cypress\e2e folder, save the feature file as: `api_data.feature`
-   Use the single feature file for the test data
-   Use the **Examples** to define the test data for the requests
-   Add both positive and negative test for the requests
-   Use the **tags** to split and categorize the test data
-   For the larger test data use the Cypress fixtures

## Folder and File Structure

```
  |-- cypress
    |-- fixtures
    |-- e2e
    |-- step_definitions
    |-- support
    |-- utils
    |-- videos
    |-- reports
    |-- screenshots
  |-- cypress.config.ts
  |-- cypress.env.json
  |-- package-lock.json
  |-- package.json
```

1. `/cypress/fixtures` or [Fixture Files](https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests.html#Fixture-Files):

    - Fixtures are used as external pieces of static data that can be used by tests.
    - Typically used with the `cy.fixture()` command and most often when stubbing network requests.
    - In this project use the fixtures to pass the long `.json` test data for the API calls. Save the `.json` files in the fixtures folder then use the file names on the test feature files to pass the test data. The requests functions can take two types of test data: `.json` file saved in fixtures folder or simple `.json` object written in the test feature file.

2. `/cypress/e2e` or [Test Files](https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests.html#Test-files)

    - To start writing tests,

        - Create the feature files here
        - Save the files with `.feature` extension
        - Refresh tests list in the Cypress Test Runner and a new file should appear in the list.

    - Subfolder naming convention depends on test grouping, which is usually based on the general functional area (e.g. `/cypress/e2e/recipes/` for recipes related APIs”).

3. `/cypress/step_definitions`

    - Add the `.cy.ts` files here

4. `/cypress/utils` for common utility functions.

5. `/cypress/videos` for video of test execution which is create automatically after you run the test in headless mode.

6. `/cypress/reports` reports generated from cypress-mochawesome-reporter are saved here.
7. `/cypress/screenshots` screenshot images which are generated by cypress for the failed tests only are saved here.

8. `/cypress.config.ts` for Cypress [configuration](https://docs.cypress.io/guides/references/configuration.html#Options).
9. `/cypress/reports` reports generated from cypress-mochawesome-reporter are saved here.
10. `/cypress/support` or [Support Files](https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests.html#Support-file)

    - A support file is a place for reusable behavior such as Custom Commands or global overrides that are available and can be applied to all spec files.

11. `/cypress.env.json` for Cypress environmental variables. This file is not pushed to github and need to be created locally with the correct credentials.

12. `/package.json` for all dependencies related to Cypress end-to-end testing.

## Tags

Following tags are used in Feature file:

-   _@positive_: Indicates towards the Happy path steps
-   _@negative_: Indicates towards the Negative Flows

## Helping Materials

-   [Cypress Requests Docs](https://docs.cypress.io/api/commands/request)
-   [Expect Assertions Docs](https://jestjs.io/docs/expect)
-   [Typescript with Cypress Docs](https://docs.cypress.io/guides/tooling/typescript-support)
-   [Environment Variable Docs](https://docs.cypress.io/guides/guides/environment-variables#Setting)
-   [Cypress Plugin API Docs](https://github.com/filiphric/cypress-plugin-api)
