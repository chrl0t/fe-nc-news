const { fetchArticleById, updateArticleVote } = require('../models/articles');

exports.getArticleById = (req, res, next) => {
  let articleId = req.params.article_id;
  fetchArticleById(articleId)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch(next);
};

exports.patchArticleVotes = (req, res, next) => {
  res.status(201).send('hi');
};
