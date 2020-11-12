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

exports.addComment = (commentToAdd) => {
  return connection('comments')
    .returning('*')
    .insert(commentToAdd)
    .then((newComment) => {
      return newComment;
    });
};

exports.fetchAllArticles = (sortBy = 'created_at', order, author, topic) => {
  let ascOrDesc = 'desc';
  if (order) ascOrDesc = 'asc';
  let articles = connection
    .select('*')
    .from('articles')
    .orderBy(sortBy, ascOrDesc);
  if (author) {
    articles.where('author', author);
  }
  if (topic) {
    articles.where('topic', topic);
  }
  return articles;
};

exports.fetchCommentsFromArticleId = (
  articleId,
  sortBy = 'created_at',
  order
) => {
  let ascOrDesc = 'desc';
  if (order) ascOrDesc = 'asc';
  return connection('comments')
    .returning('*')
    .where('article_id', '=', articleId)
    .orderBy(sortBy, ascOrDesc)
    .then((comments) => {
      if (comments.length === 0) {
        return Promise.reject({ status: 404, msg: 'NOT FOUND' });
      } else {
        return comments;
      }
    });
};

exports.addArticle = (articleToAdd) => {
  return connection('articles')
    .returning('*')
    .insert(articleToAdd)
    .then((newArticle) => {
      let obj = newArticle[0];
      for (let key in obj) {
        if (obj[key] === null) {
          return Promise.reject({ status: 400, msg: 'MISSING INFO' });
        }
      }
      return newArticle;
    });
};
