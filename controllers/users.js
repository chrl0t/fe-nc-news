const {
  fetchUserByUsername,
  fetchAllUsers,
  addUser,
} = require('../models/users');

exports.getUserByUsername = (req, res, next) => {
  let username = req.params.username;
  fetchUserByUsername(username)
    .then((user) => {
      res.status(200).send({ user });
    })
    .catch(next);
};

exports.getAllUsers = (req, res, next) => {
  fetchAllUsers()
    .then((users) => {
      res.status(200).send({ users });
    })
    .catch(next);
};

exports.postUser = (req, res, next) => {
  let newUser = req.body;
  addUser(newUser)
    .then((user) => {
      res.status(201).send({ user });
    })
    .catch(next);
};
