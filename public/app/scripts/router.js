define(['backbone'], function(Backbone) {

  'use strict';

  var Router = Backbone.Router.extend({

    routes: {
      '': 'welcome',
      'layer/:layerSlug': 'layer',
      'layer/:layerSlug/:districtId': 'district'
    },

    welcome: function() {
      console.log('welcome');
    },

    layer: function(layerSlug) {
      Backbone.Events.trigger('router:change', {
        layer: layerSlug
      });
    },

    district: function(layerSlug, districtId) {
      Backbone.Events.trigger('router:change', {
        layer: layerSlug,
        district: districtId
      });
    }

  });

  return Router;

});
