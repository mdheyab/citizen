define([
  'underscoreString',
  'backbone'
], function(_, Backbone) {

  'use strict';

  var user = sessionStorage.getItem('citizen:cartodbuser');

  var DelinquencyCollection = Backbone.Collection.extend({

    url: function() {
      return _.str.sprintf('//%s.cartodb.com/api/v1/sql', user);
    },

    parse: function(data) {
      return data.rows;
    }

  });

  return DelinquencyCollection;

});
