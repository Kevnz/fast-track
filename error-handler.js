module.exports = function(logger) {
  return function errorHander(err, req, res, next) {
    logger(err);
    const errorToShow = process.env.NODE_ENV === 'production' ? {} : err;
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: errorToShow,
      title: 'There was a problem',
      pageDescription: 'bad things happened',
      url: req.originalUrl
    });
  }
}