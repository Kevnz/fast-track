const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const favicon = require('serve-favicon');
const layouts = require('express-ejs-layouts');
const session = require('express-session');
const flash = require('flash');
const config = require('xtconf')();

const app = express();
app.use(session(config.get('session')));
app.use(flash());

app.set('views', path.join(process.cwd, config.get('views') || 'views'));
app.set('view engine', 'ejs');
app.use(layouts);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(process.cwd, config.get('public') || 'public')));
app.use(favicon(path.join(process.cwd, config.get('favicon') || 'public/favicon.ico' )));
app.use(userSession);

app.use(function notFoundHandler(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function devErrorHander(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err,
      username: 'Error',
      title: 'There was a problem',
      pageDescription: 'bad things happened',
      url: req.originalUrl
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function prodErrorHander(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
    username: 'Error',
    title: 'There was a problem',
    pageDescription: 'Unfortunately there was a problem with that request.',
    url: req.originalUrl
  });
});

module.exports = app;
