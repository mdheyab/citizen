define(['jquery', 'backbone'], function($, Backbone) {

  'use strict';

  var DetailView = Backbone.View.extend({

    el: '#detailView',

    events: {
      'click .btn-close': 'disableSidebar'
    },

    initialize: function() {
      this.$header = $('.layout-header');
      this.setListeners();
    },

    setListeners: function() {
      Backbone.Events.on('presenter:change', this.activateSidebar, this);
    },

    activateSidebar: function() {
      this.$header.addClass('is-sliced');
    },

    disableSidebar: function() {
      this.$header.removeClass('is-sliced');
    }

  });

  return DetailView;

});
