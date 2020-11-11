const app = require('../app');

const articlesRouter = require('express').Router();
const {
  getArticleById,
  patchArticleVotes,
  deleteArticle,
  getAllArticles,
} = require('../controllers/articles');

articlesRouter.route('/').get(getAllArticles);

articlesRouter
  .route('/:article_id')
  .get(getArticleById)
  .patch(patchArticleVotes)
  .delete(deleteArticle);

module.exports = articlesRouter;
