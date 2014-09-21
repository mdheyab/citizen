define(['jquery', 'backbone'], function($, Backbone) {

  'use strict';

  var IndicatorsView = Backbone.View.extend({

    el: '#indicatorsView',

    events: {
      'click a': 'changeLayer'
    },

    initialize: function() {
      Backbone.Events.trigger('indicators:change', 'citizen');
    },

    changeLayer: function(e) {
      var target = $(e.currentTarget);

      target.closest('ul').find('a').removeClass('active');
      target.addClass('active');

      Backbone.Events.trigger('indicators:change', target.data('layer'));

      e.preventDefault();
    }

  });

  return IndicatorsView;

});
