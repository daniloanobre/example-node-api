// Author - Danilo Assis Nobre | danilo@assistatecnologia.com.br

/*
 * MAIN APP
 */

 const express = require('express');
 const path = require('path');
// const favicon = require('serve-favicon');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

// Required configs
const logger = require('./config/logger');
const i18n = require('./config/i18n');
const errorsHelper = require('./helpers/errors');

// Routes
const index = require('./routes/index');
const users = require('./routes/users');
const tasks = require('./routes/tasks');

// App instance
const app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(morgan('common', { stream: logger.stream }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// default: using 'accept-language' header to guess language settings
app.use(i18n.init);

// enabled routes
app.use('/', index);
app.use('/users', users);
app.use('/tasks', tasks);

// catch 404 and forward to error handler
app.use((req, res, next) => next(errorsHelper.notFoundError()));


// error handler
app.use((error, req, res) => {
  const err = error;

  if (app.get('env') !== 'development') delete err.stack;

  res.status(err.status || 500);

  res.json({
    error: {
      message: err.message,
      status: err.status,
      stack: err.stack,
    },
  });
});


module.exports = app;
