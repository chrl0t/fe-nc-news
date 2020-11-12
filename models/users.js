const connection = require('../db/connection');

exports.fetchUserByUsername = (username) => {
  return connection('users')
    .select('*')
    .where('username', '=', username)
    .then((user) => {
      if (user.length === 0) {
        return Promise.reject({ status: 404, msg: 'NOT FOUND' });
      } else {
        return user;
      }
    });
};

exports.fetchAllUsers = () => {
  return connection('users')
    .select('*')
    .then((users) => {
      return users;
    });
};
