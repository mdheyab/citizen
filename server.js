'use strict';

var debug = require('debug')('citizen');
var app = require('./config/application');
var server;

server = app.listen(app.get('port'), function() {
  debug('Server runing on port ' + server.address().port);
});
