exports.up = function (knex) {
  return knex.schema.createTable('users', (usersTable) => {
    usersTable.text('username').unique();
    usersTable.text('name');
    usersTable.text('avatar_url');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('users');
};
