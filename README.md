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
  - [Run Commands](#run-commands)
  - [Code Examples](#code-examples)
    - [Code Example of Cypress Request](#code-example-of-cypress-request)
  - [Cypress Request](#cypress-request)
  - [Folder and File Structure](#folder-and-file-structure)
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

-   [x] Add Reporting plugin

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
    npx cypress run --spec cypress/e2e/file_name.cy.ts
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

Options available for the `cy.request()`

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

## Folder and File Structure

```
  |-- cypress
    |-- fixtures
    |-- e2e
    |-- support
    |-- reports
  |-- cypress.config.ts
  |-- cypress.env.json
  |-- package-lock.json
  |-- package.json
```

1. `/cypress/fixtures` or [Fixture Files](https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests.html#Fixture-Files):

    - Fixtures are used as external pieces of static data that can be used by tests.
    - Typically used with the `cy.fixture()` command and most often when stubbing network requests.

2. `/cypress/e2e` or [Test Files](https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests.html#Test-files)

    - To start writing tests,

        - Create `.cy.ts` test files here

    - Subfolder naming convention depends on test grouping, which is usually based on the general functional area (e.g. `/cypress/e2e/recipes/` for recipes related APIs”).

3. `/cypress.config.ts` for Cypress [configuration](https://docs.cypress.io/guides/references/configuration.html#Options).
4. `/cypress/reports` reports generated from cypress-mochawesome-reporter are saved here.
5. `/cypress/support` or [Support Files](https://docs.cypress.io/guides/core-concepts/writing-and-organizing-tests.html#Support-file)

    - A support file is a place for reusable behavior such as Custom Commands or global overrides that are available and can be applied to all spec files.

6. `/cypress.env.json` for Cypress environmental variables. This file is not pushed to github and need to be created locally with the correct credentials.

7. `/package.json` for all dependencies related to Cypress end-to-end testing.

## Helping Materials

-   [Cypress Requests Docs](https://docs.cypress.io/api/commands/request)
-   [Expect Assertions Docs](https://jestjs.io/docs/expect)
-   [Typescript with Cypress Docs](https://docs.cypress.io/guides/tooling/typescript-support)
-   [Environment Variable Docs](https://docs.cypress.io/guides/guides/environment-variables#Setting)
