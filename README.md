# NC News Backend 📰

A full stack responsive news application.

This is the backend part of the app - an API built with a PSQL database and an express server.

The frontend is built with React.

You can see the code for the frontend here: https://github.com/chrl0t/front-end-nc-news

Here is a link to the hosted version: https://chazzys-nc-news.herokuapp.com/api/articles

## Background

This is an API I built with the purpose of accessing application data programmatically. I used a PSQL database and interacted with it using knex along with full TDD using Jest test suite.

Available endpoints are as follows:

```http
GET /api/topics

GET /api/users/:username

DELETE /api/articles/:article_id
PATCH /api/articles/:article_id
GET /api/articles/:article_id

POST /api/articles/:article_id/comments
GET /api/articles/:article_id/comments

GET /api/articles
POST /api/articles

PATCH /api/comments/:comment_id
DELETE /api/comments/:comment_id

GET /api

DELETE /api/articles/:article_id
POST /api/topics
POST /api/users
GET /api/users
```
