require([
  'backbone',
  'router'
], function(Backbone, Router) {

  'use strict';

  var app = {};

  app.router = new Router();

  Backbone.history.start({
    pushState: true
  });

});
