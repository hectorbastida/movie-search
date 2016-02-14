var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var swig = require('swig');
var routes = require('./routes/index');

var app = express();
swig.setDefaults({
  cache:false,
  varControls: ['<%=', '%>'] //<-----------------------------tags que se usarán en el html para usar swig
});
// view engine setup
app.engine('html',swig.renderFile);
app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.use('/', routes);



module.exports = app;
