const {
  topicData,
  articleData,
  commentData,
  userData,
} = require('../data/index.js');
const {
  formatArticles,
  changeKey,
  createArticleRef,
  formatComments,
} = require('../utils/data-manipulation');

exports.seed = function (knex) {
  return knex.migrate
    .rollback()
    .then(() => {
      return knex.migrate.latest();
    })
    .then(() => {
      return knex.insert(topicData).into('topics').returning('*');
    })
    .then((topicsRows) => {
      console.log(`inserted ${topicsRows.length} rows into topics table`);
      return knex.insert(userData).into('users').returning('*');
    })
    .then((userRows) => {
      console.log(`inserted ${userRows.length} into users table`);
      const formattedArticles = formatArticles(articleData);
      return knex.insert(formattedArticles).into('articles').returning('*');
    })
    .then((articleRows) => {
      console.log(`inserted ${articleRows.length} into articles table`);
      const changedKey = changeKey(commentData);
      const formatTime = formatArticles(changedKey);
      const articleRef = createArticleRef(articleRows);
      const formattedComments = formatComments(articleRef, formatTime);
      return knex.insert(formattedComments).into('comments').returning('*');
    })
    .then((formattedComments) => {
      console.log(`inserted ${formattedComments.length} into comments table`);
    });
};
