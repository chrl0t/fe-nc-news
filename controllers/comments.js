const { updateCommentVote } = require('../models/comments');

exports.patchCommentVotes = (req, res, next) => {
  let idToUpdate = req.params.comment_id;
  let voteCountToAdd = req.body.inc_votes;
  updateCommentVote(idToUpdate, voteCountToAdd).then((comment) => {
    res.status(200).send({ comment });
  });
};
