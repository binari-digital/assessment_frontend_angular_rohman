# Angular Test
## Summary

Your task is to create an admin dashboard using Angular framework with domain driven approach.

This repository contains a starter app ready for you to work on. Feel free to add any additional libraries you need.

## Instructions

### Objective

Please use the following requirement and rule when working on the assessment. Your assessment will be scored based on the key indicators stated in Assessment Aspects section.

You are free to add your assumption to ease your work, for any additional assumption please include in your readme file.

Develop the task with the mindset that it must be ready for production.


### Requirements
Build an admin dashboard with following requirements:

1. Implement login feature
  * Use this endpoint as data source: https://6147e05c65467e0017384c29.mockapi.io/api/users
  * Add client side validation as much as you can
  * Add any additional information if login is error or success.
  * Store the login data in session storage
2. Build admin dashboard to display a table list of product
  * Use this endpoint as data source: https://6147e05c65467e0017384c29.mockapi.io/api/products
    * please use token from users API as dummy authorization token for request
  * Provide sorting, search, and color filtering (filter options can be hardcoded) in the client side
  * Provide pagination and page size
  * Image can be viewed in pop up modal
  * Only authenticated user can access dashboard page, otherwise redirect to error page
3. You are free to use any template as long as its use bootstrap.
  * Provide sidebar
    * sidebar must contain active menu, please provide any other dummy menu
  * Provide topbar
    * topbar must contain username, avatar, and logout functionality

## Submission

1. Fork this repository
2. Make some changes with proper commit logs
3. Make a Pull Request

## Assessment Aspects

* Feature completeness
* Code cleanliness
* Quality assessment with unit test

Good luck.
