const app = require('../app');

const articlesRouter = require('express').Router();
const {
  getArticleById,
  patchArticleVotes,
  deleteArticle,
  getAllArticles,
  postComment,
} = require('../controllers/articles');

articlesRouter.route('/').get(getAllArticles);

articlesRouter
  .route('/:article_id')
  .get(getArticleById)
  .patch(patchArticleVotes)
  .delete(deleteArticle)
  .post(postComment);

module.exports = articlesRouter;
