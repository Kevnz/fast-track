module.exports = function errorHander(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: err,
    username: 'Error',
    title: 'There was a problem',
    pageDescription: 'bad things happened',
    url: req.originalUrl
  });
}