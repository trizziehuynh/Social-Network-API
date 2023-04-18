# 18 NoSQL: Social Network API

## Description

This is an API for a social network web application where users can share their thoughts, react to friends’ thoughts, and create a friend list. 

## Techonology

- MongoDB
- Mongoose
- Express
- Nodejs

## Installation

`npm install`

## Acceptance Criteria

```md
GIVEN a social network API
WHEN I enter the command to invoke the application
THEN my server is started and the Mongoose models are synced to the MongoDB database
WHEN I open API GET routes in Insomnia for users and thoughts
THEN the data for each of these routes is displayed in a formatted JSON
WHEN I test API POST, PUT, and DELETE routes in Insomnia
THEN I am able to successfully create, update, and delete users and thoughts in my database
WHEN I test API POST and DELETE routes in Insomnia
THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list
```

#### Walk-Through Video

[Video](https://drive.google.com/file/d/1yrP52maju3rOAjWs0np6O1FPbL__ytTL/view)

#### Application Screenshots
[Figure 1](./images/Screenshot%202023-04-18%20164532.png)
[Figure 2](./images/Screenshot%202023-04-18%20164551.png)
[Figure 3](./images/Screenshot%202023-04-18%20164558.png)