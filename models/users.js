const connection = require('../db/connection');

exports.fetchUserByUsername = (username) => {
  return connection('users')
    .select('*')
    .where('username', '=', username)
    .then((user) => {
      return user;
    });
};
