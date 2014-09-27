require([
  'backbone',
  'router',
  'presenter',
  'views/map',
  'views/indicators'
], function(Backbone, Router, Presenter, MapView, IndicatorsView) {

  'use strict';

  var app = {};

  app.presenter = new Presenter();
  app.router = new Router();
  app.map = new MapView();
  app.indicators = new IndicatorsView();

  Backbone.history.start({
    pushState: false
  });

});
