const app = require('../app');
const { send405 } = require('../controllers/errors');

const articlesRouter = require('express').Router();
const {
  getArticleById,
  patchArticleVotes,
  deleteArticle,
  getAllArticles,
  postComment,
  getCommentsFromArticleId,
  postArticle,
} = require('../controllers/articles');

articlesRouter.route('/').get(getAllArticles).post(postArticle).all(send405);

articlesRouter
  .route('/:article_id')
  .get(getArticleById)
  .patch(patchArticleVotes)
  .delete(deleteArticle)
  .post(postComment);

articlesRouter
  .route('/:article_id/comments')
  .get(getCommentsFromArticleId)
  .all(send405);

module.exports = articlesRouter;
