const connection = require('../db/connection');

exports.updateCommentVote = (idToUpdate, voteCountToAdd) => {
  return connection('comments')
    .returning('*')
    .where('comments_id', '=', idToUpdate)
    .increment({ votes: voteCountToAdd })
    .then((comment) => {
      if (comment.length === 0) {
        return Promise.reject({ status: 404, msg: 'NOT FOUND' });
      } else {
        return comment;
      }
    });
};
