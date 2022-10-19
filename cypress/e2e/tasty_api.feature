Feature: testing the Tasty APIs
    Scenario Outline: Test of <api_name> API with <test>
        Given I add <auth_key> auth key
        When I send the <type> request with <url> and <test_data>
        Then I should see <response_code> response code
        Then I should see <property_name> in response

        @positive
        Examples:
            | type | api_name                  | test       | auth_key | url                        | response_code | test_data                    | property_name |
            | GET  | auto-complete recipes     | valid data | correct  | /recipes/auto-complete     | 2xx           | { "prefix": "chicken soup" } | results       |
            | GET  | list recipes              | valid data | correct  | /recipes/list              | 2xx           | recipes_list.json            | results       |
            | GET  | list-similarities recipes | valid data | correct  | /recipes/list-similarities | 2xx           | { "recipe_id": "8138" }      | results       |
            | GET  | get-more-info recipes     | valid data | correct  | /recipes/get-more-info     | 2xx           | { "id": "8138" }             |               |
            | GET  | tips list                 | valid data | correct  | /tips/list                 | 2xx           | tips_list.json               | results       |
            | GET  | feeds list                | valid data | correct  | /feeds/list                | 2xx           | feeds_list.json              | results       |

        @negative
        Examples:
            | type | api_name                  | test           | auth_key | url                        | response_code | test_data                    | property_name |
            | GET  | auto-complete recipes     | wrong auth key | wrong    | /recipes/auto-complete     | 4xx           | { "prefix": "chicken soup" } |               |
            | GET  | list recipes              | wrong auth key | wrong    | /recipes/list              | 4xx           | recipes_list.json            |               |
            | GET  | list-similarities recipes | wrong auth key | wrong    | /recipes/list-similarities | 4xx           | { "recipe_id": "8138" }      |               |
            | GET  | get-more-info recipes     | empty auth key | empty    | /recipes/get-more-info     | 4xx           | { "id": "8138" }             |               |
            | GET  | tips list                 | empty auth key | empty    | /tips/list                 | 4xx           | tips_list.json               |               |
            | GET  | feeds list                | empty auth key | empty    | /feeds/list                | 4xx           | feeds_list.json              |               |
