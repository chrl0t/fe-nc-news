const app = require('../app');
const { send405 } = require('../controllers/errors');

const commentsRouter = require('express').Router();
const { patchCommentVotes, deleteComment } = require('../controllers/comments');

commentsRouter
  .route('/:comment_id')
  .patch(patchCommentVotes)
  .delete(deleteComment)
  .all(send405);

module.exports = commentsRouter;
