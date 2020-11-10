exports.up = function (knex) {
  return knex.schema.createTable('articles', (articlesTable) => {
    articlesTable.increments('article_id').primary();
    articlesTable.text('title');
    articlesTable.text('author').references('users.username');
    articlesTable.text('body');
    articlesTable.text('topic').references('topics.slug');
    articlesTable.timestamp('created_at', { useTz: false });
    articlesTable.integer('votes').defaultTo(0);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('articles');
};
