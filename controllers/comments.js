const { deleteCommentById } = require('../models/comments');
const { updateCommentVote } = require('../models/comments');

exports.patchCommentVotes = (req, res, next) => {
  let idToUpdate = req.params.comment_id;
  let voteCountToAdd = req.body.inc_votes;
  updateCommentVote(idToUpdate, voteCountToAdd)
    .then((comment) => {
      res.status(200).send({ comment });
    })
    .catch(next);
};

exports.deleteComment = (req, res, next) => {
  let idToDelete = req.params.comment_id;
  deleteCommentById(idToDelete)
    .then(() => {
      res.status(204).send();
    })
    .catch(next);
};
