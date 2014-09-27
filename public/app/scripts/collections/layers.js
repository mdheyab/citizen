define([
  'underscoreString',
  'backbone',
  'text!queries/elderlyPopulation.pgsql',
  'text!queries/unemployed.pgsql',
  'text!cartocss/elderlyPopulation.cartocss',
  'text!cartocss/unemployed.cartocss'
], function(_, Backbone,
  elderlyPopulationQuery, unemployedQuery,
  elderlyPopulationStyle, unemployedStyle) {

  'use strict';

  var layersData = [{
    slug: 'elderly-population',
    sql: elderlyPopulationQuery,
    cartocss: elderlyPopulationStyle,
    interactivity: 'id, name, value'
  }, {
    slug: 'unemployed',
    sql: unemployedQuery,
    cartocss: unemployedStyle,
    interactivity: 'id, name, value'
  }];

  var LayersCollection = Backbone.Collection.extend({

    initialize: function() {
      this.set(layersData);
    }

  });

  return LayersCollection;

});
