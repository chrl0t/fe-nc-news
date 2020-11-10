exports.PSQLErrorHandler = (err, req, res, next) => {
  const errorCodes = ['22P02'];
  if (errorCodes.includes(err.code)) {
    res.status(400).send({ msg: 'BAD REQUEST' });
  } else {
    next(err);
  }
};

exports.send404 = (req, res, next) => {
  res.status(404).send({ msg: 'NOT FOUND' });
};

exports.customErrorHandler = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
};

exports.handleInternalErrors = (err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: 'INTERNAL SERVER ERROR' });
};
