const connection = require('../db/connection');

exports.fetchArticleById = (articleId) => {
  return connection
    .select('articles.*')
    .where('articles.article_id', '=', articleId)
    .count('comments_id AS comment_count')
    .from('articles')
    .leftJoin('comments', 'articles.article_id', '=', 'comments.article_id')
    .groupBy('articles.article_id')
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
      if (article.length === 0) {
        return Promise.reject({ status: 404, msg: 'NOT FOUND' });
      } else {
        return article;
      }
    });
};

exports.deleteArticleById = (articleToDelete) => {
  return connection
    .delete()
    .from('articles')
    .where('article_id', '=', articleToDelete)
    .then((deleteCount) => {
      if (deleteCount === 0) {
        return Promise.reject({ status: 404, msg: 'NOT FOUND' });
      }
    });
};

exports.fetchAllArticles = () => {
  return connection.select('*').from('articles');
};
