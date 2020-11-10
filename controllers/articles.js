const { fetchArticleById } = require('../models/articles');

exports.getArticleById = (req, res, next) => {
  res.status(200).send('hi');
};
