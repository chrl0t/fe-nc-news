const { fetchUserByUsername } = require('../models/users');

exports.getUserByUsername = (req, res, next) => {
  let username = req.params.username;
  fetchUserByUsername(username)
    .then((user) => {
      res.status(200).send({ user });
    })
    .catch(next);
};

exports.getAllUsers = (req, res, next) => {
  res.status(200).send();
};
