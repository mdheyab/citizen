define(['backbone', 'classjs'], function(Backbone, Class) {

  'use strict';

  var PresenterModel = Backbone.Model.extend({});

  var Presenter = new Class({

    initialize: function() {
      this.model = new PresenterModel();
      this.setListeners();
    },

    setListeners: function() {
      this.model.on('change', function() {
        Backbone.Events.trigger('presenter:change', this.model);
      }, this);

      Backbone.Events.on('router:change', function(params) {
        this.model.set(params);
      }, this);
    }

  });

  return Presenter;

});
