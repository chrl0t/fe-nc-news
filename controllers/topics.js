const { fetchAllTopics, addTopic } = require('../models/topics');

exports.getAllTopics = (req, res, next) => {
  fetchAllTopics().then((topics) => {
    res.status(200).send({ topics });
  });
};

exports.postTopic = (req, res, next) => {
  let topicToAdd = req.body;
  addTopic(topicToAdd)
    .then((newTopic) => {
      res.status(201).send(newTopic);
    })
    .catch(next);
};
