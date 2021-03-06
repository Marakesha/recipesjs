var express = require('express');
var session=require('express-session');

// setup database connection
var mongoose = require('mongoose');
var mongoDB =  process.env.MONGODB_URI || 'mongodb://localhost:27017/recipes'; //my bd

var autoIncrement = require('mongoose-auto-increment');
mongoose.Promise = require('bluebird');
mongoose.connect(mongoDB, {useMongoClient: true});
autoIncrement.initialize(mongoose.connection);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var paginate = require('express-paginate');

var index = require('./routes/index');

var app = express();

// add pagination
app.use(paginate.middleware(10, 50));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'garden',
    resave: true,
    saveUninitialized: true,
   // cookie: { secure: true }
}));
var sess;

app.use('/', index);

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
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
