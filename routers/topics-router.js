const app = require('../app');

const topicsRouter = require('express').Router();
const { getAllTopics, postTopic } = require('../controllers/topics');
const { send405 } = require('../controllers/errors');

topicsRouter.route('/').get(getAllTopics).post(postTopic).all(send405);

module.exports = topicsRouter;
