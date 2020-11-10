const app = require('../app');

const usersRouter = require('express').Router();
const { getUserById } = require('../controllers/users');

usersRouter.route('/:user_id').get(getUserById);

module.exports = usersRouter;
