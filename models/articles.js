const connection = require('../db/connection');

exports.fetchArticleById = (articleId) => {
  return connection('articles')
    .select('*')
    .where('article_id', '=', articleId)
    .then((article) => {
      if (article.length === 0) {
        return Promise.reject({ status: 404, msg: 'NOT FOUND' });
      } else {
        return article;
      }
    });
};

exports.updateArticleVote = (idToUpdate, voteCountToAdd) => {
  return connection('articles')
    .returning('*')
    .where('article_id', '=', idToUpdate)
    .increment({ votes: voteCountToAdd })
    .then((article) => {
      return article;
    });
};
