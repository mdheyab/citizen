define(['jquery', 'backbone'], function($, Backbone) {

  'use strict';

  var IndicatorsView = Backbone.View.extend({

    el: '#indicatorsView',

    events: {
      'click a': 'changeLayer'
    },

    initialize: function() {
      // Backbone.Events.trigger('indicators:change', 'citizen');
      this.setListeners();
    },

    setListeners: function() {
      Backbone.Events.on('presenter:change', this.setCurrentLayer, this);
    },

    setCurrentLayer: function(presenter) {
      var current = presenter.get('layer');

      this.$el.find('a').removeClass('active');
      this.$el.find('a[data-layer="' + current + '"]').addClass('active');
    }

  });

  return IndicatorsView;

});
