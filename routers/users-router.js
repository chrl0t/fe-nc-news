const app = require('../app');
const { send405 } = require('../controllers/errors');

const usersRouter = require('express').Router();
const {
  getAllUsers,
  getUserByUsername,
  postUser,
} = require('../controllers/users');

usersRouter.route('/').get(getAllUsers).post(postUser).all(send405);

usersRouter.route('/:username').get(getUserByUsername).all(send405);

module.exports = usersRouter;
