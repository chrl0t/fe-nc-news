const connection = require('../db/connection');

exports.fetchAllTopics = () => {
  return connection.select('*').from('topics');
};

exports.addTopic = (topicToAdd) => {
  return connection('topics')
    .returning('*')
    .insert(topicToAdd)
    .then((newTopic) => {
      return newTopic;
    });
};
