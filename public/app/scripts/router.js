define(['backbone'], function(Backbone) {

  'use strict';

  var Router = Backbone.Router.extend({

    routes: {
      '': 'welcome',
      'layer/:layerSlug': 'layer'
      // 'district/:layer/:districtId': 'district'
    },

    welcome: function() {
      console.log('welcome');
    },

    layer: function(layerSlug) {
      Backbone.Events.trigger('layer:change', layerSlug);
    },

    district: function(districtId) {
      console.log(districtId);
    }

  });

  return Router;

});
