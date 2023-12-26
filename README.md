# Backend Code Challenge

Welcome, dear developer fellow. In this test, we will analyze your general knowledge of NodeJS development. You will find below the instructions to complete this challenge.

## Description

This repository implements an API to manage a cooking recipe book. The API is not finished. Thus, you must analyze and implement the user stories below into new functionalities of the API.

### User stories

- As a user, I would like to save a new receipt in the database
- As a user, I would like to store the cooking time (in minutes)
- As a user, I would like to find recipes according to some filters:
    - Given a list of ingredients, I would like to know all recipes I can cook.
    - I would like to get all recipes by the level of difficulty.
    - Given a time in minutes, I would like to know all recipes I can cook.


### Other requirements

- Replace the "any" types in the code with valuable types.
- The API connects with a database located in a MongoDB Atlas server. Implement a Docker file to start a MongoDB container. 

### What do we value?

- We'll look at how you structure the application layers (outgoing calls, environment variables, logs, error handling), readability, and documentation.

- Improvement of the provided code.

- Unit testing or any other functionality that adds value to the project or the code will be taken into account.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

```
