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
  let idToUpdate = req.params.article_id;
  let voteCountToAdd = req.body.inc_votes;
  updateArticleVote(idToUpdate, voteCountToAdd)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch(next);
};

exports.deleteArticle = (req, res, next) => {
  let treasureToDelete = req.params.article_id;
  console.log(treasureToDelete);
  res.status(204).send('hi');
};

exports.getAllArticles = (req, res, next) => {
  res.status(200).send('hi');
};
