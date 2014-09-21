require([
  'backbone',
  'router',
  'views/map',
  'views/indicators'
], function(Backbone, Router, MapView, IndicatorsView) {

  'use strict';

  var app = {};

  app.router = new Router();
  app.map = new MapView();
  app.indicators = new IndicatorsView();

  Backbone.history.start({
    pushState: true
  });

});
