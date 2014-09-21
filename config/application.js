'use strict';

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var i18n = require('i18n');

// Init application
var app = express();

// Setting locales
i18n.configure({
  locales:['es', 'en'],
  defaultLocale: 'es',
  directory: path.join(__dirname, 'locales')
});

// Using Jade templates
app.set('views', path.join(__dirname, '../app', 'views'));
app.set('view engine', 'jade');

// Setting application configurations
app.set('port', process.env.PORT || 3000);
app.use(i18n.init);
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

// Routing
require('./routes')(app);

module.exports = app;
