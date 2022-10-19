Feature: testing the Tasty APIs
    Scenario Outline: Test of <api_name> API with <test>
        Given I add <auth_key> auth key
        When I send the <type> request with <url> and <test_data>
        Then I should see <response_code> response code
        Then I should see <property_name> in response

        @positive
        Examples:
            | type | api_name                  | test       | auth_key | url                        | response_code | test_data                                                               | property_name |
            | GET  | recipes/auto-complete     | valid data | correct  | /recipes/auto-complete     | 2xx           | { "prefix": "chicken soup" }                                            | results       |
            | GET  | recipes/list              | valid data | correct  | /recipes/list              | 2xx           | { "from": "0", "size": "20", "tags": "under_30_minutes" }               | results       |
            | GET  | recipes/list-similarities | valid data | correct  | /recipes/list-similarities | 2xx           | { "recipe_id": "8138" }                                                 | results       |
            | GET  | recipes/get-more-info     | valid data | correct  | /recipes/get-more-info     | 2xx           | { "id": "8138" }                                                        |               |
            | GET  | tips/list                 | valid data | correct  | /tips/list                 | 2xx           | { "id": "3562", "from": "0", "size": "30" }                             | results       |
            | GET  | feeds/list                | valid data | correct  | /feeds/list                | 2xx           | { "size": "5", "timezone": "+0700", "vegetarian": "false", "from": "0"} | results       |

        @negative
        Examples:
            | type | api_name                  | test           | auth_key | url                        | response_code | test_data                                                               | property_name |
            | GET  | recipes/auto-complete     | wrong auth key | wrong    | /recipes/auto-complete     | 4xx           | { "prefix": "chicken soup" }                                            |               |
            | GET  | recipes/list              | wrong auth key | wrong    | /recipes/list              | 4xx           | { "from": "0", "size": "20", "tags": "under_30_minutes" }               |               |
            | GET  | recipes/list-similarities | wrong auth key | wrong    | /recipes/list-similarities | 4xx           | { "recipe_id": "8138" }                                                 |               |
            | GET  | recipes/get-more-info     | empty auth key | empty    | /recipes/get-more-info     | 4xx           | { "id": "8138" }                                                        |               |
            | GET  | tips/list                 | empty auth key | empty    | /tips/list                 | 4xx           | { "id": "3562", "from": "0", "size": "30" }                             |               |
            | GET  | feeds/list                | empty auth key | empty    | /feeds/list                | 4xx           | { "size": "5", "timezone": "+0700", "vegetarian": "false", "from": "0"} |               |
