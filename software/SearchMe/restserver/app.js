var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var Q = require('q');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/searchMe');
var db = mongoose.connection;
var dbCollection = db.collections;

var app = express();

// view engine setup
app.engine('html', require('ejs').renderFile);
app.set('views',path.join(__dirname , '../client/app/partials'));

app.set('view engine', 'html');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.all('/api/user/*', require('./routes/users'));

index(app);

app.use(express.static(path.join(__dirname, '../client')));
app.use(express.static(path.join(__dirname, '../client/.tmp')));
app.use(express.static(path.join(__dirname, '../client/app')));
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = err  ? err : {};

  // render the error page
  console.log("my err"+err);
  res.status(err.status || 500);
  res.render('error');
});
module.exports = app;
