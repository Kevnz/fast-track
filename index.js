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

app.set('views', path.join(process.cwd(), config.get('views') || 'views'));
app.set('view engine', 'ejs');
app.use(layouts);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(process.cwd(), config.get('public') || 'public')));
app.use(favicon(path.join(process.cwd(), config.get('favicon') || 'public/favicon.ico' )));

module.exports = app;


