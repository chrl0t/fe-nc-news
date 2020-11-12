const { updateCommentVote } = require('../models/comments');

exports.patchCommentVotes = (req, res, next) => {
  console.log('in the controller');
  res.status(200).send();
};
