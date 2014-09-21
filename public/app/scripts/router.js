define(['backbone'], function(Backbone) {

  'use strict';

  var Router = Backbone.Router.extend({

    routes: {
      '/': 'welcome',
      '/district/:districtId': 'district',
      '/compare/:districtA/:districtB': 'compare'
    },

    welcome: function() {},

    district: function(districtId) {
      console.log(districtId);
    },

    compare: function(districtA, districtB) {
      console.log(districtA, districtB);
    }

  });

  return Router;

});
