require([
  'backbone',
  'router',
  'presenter',
  'views/map',
  'views/indicators',
  'views/detail'
], function(Backbone, Router, Presenter, MapView, IndicatorsView, DetailView) {

  'use strict';

  var app = {};

  app.presenter = new Presenter();
  app.router = new Router();
  app.map = new MapView();
  app.indicators = new IndicatorsView();
  app.detail = new DetailView();

  Backbone.history.start({
    pushState: false
  });

});
