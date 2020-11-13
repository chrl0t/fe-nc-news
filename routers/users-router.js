const app = require('../app');

const usersRouter = require('express').Router();
const {
  getAllUsers,
  getUserByUsername,
  postUser,
} = require('../controllers/users');

usersRouter.route('/').get(getAllUsers).post(postUser);

usersRouter.route('/:username').get(getUserByUsername);

module.exports = usersRouter;
