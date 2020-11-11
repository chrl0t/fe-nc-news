const app = require('../app');

const articlesRouter = require('express').Router();
const {
  getArticleById,
  patchArticleVotes,
  deleteArticle,
  getAllArticles,
  postComment,
  getCommentsFromArticleId,
} = require('../controllers/articles');

articlesRouter.route('/').get(getAllArticles);

articlesRouter
  .route('/:article_id')
  .get(getArticleById)
  .patch(patchArticleVotes)
  .delete(deleteArticle)
  .post(postComment);

articlesRouter.route('/:article_id/comments').get(getCommentsFromArticleId);

module.exports = articlesRouter;
