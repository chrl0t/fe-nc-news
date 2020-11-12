const connection = require('../db/connection');

exports.updateCommentVote = (idToUpdate, voteCountToAdd) => {
  return connection('comments')
    .returning('*')
    .where('comments_id', '=', idToUpdate)
    .increment({ votes: voteCountToAdd })
    .then((comment) => {
      return comment;
    });
};
