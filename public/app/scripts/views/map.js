define([
  'underscore',
  'underscoreString',
  'backbone',
  'text!queries/elderlyPopulation.pgsql',
  'text!cartocss/elderlyPopulation.cartocss',
  'text!templates/infowindow.handlebars'
], function(_, underscoreString, Backbone, elderlyPopulationQuery, elderlyPopulationStyle, infowindowTpl) {

  'use strict';

  var MapView = Backbone.View.extend({

    el: '#mapView',

    options: {
      urlTiles: 'https://cartocdn_{s}.global.ssl.fastly.net/base-dark/{z}/{x}/{y}.png',
      // urlTiles: 'https://{s}.tiles.mapbox.com/v4/casius.jifc84jf/{z}/{x}/{y}@2x.png?access_token=pk.eyJ1IjoiY2FzaXVzIiwiYSI6ImJDMkpucTQifQ.5rm4_TsT8_PH8TzOY2V3FQ',
      map: {
        center: [40.417111100000000000, -3.703113300000041000],
        zoom: 11,
        zoomControl: false
      },
      cartodb: {
        'user_name': sessionStorage.getItem('citizen:cartodbuser'),
        type: 'cartodb',
        sublayers: []
      }
    },

    initialize: function() {
      this.layers = {
        'elderly-population': {
          sql: elderlyPopulationQuery,
          cartocss: elderlyPopulationStyle,
          interactivity: 'name, value'
        }
      };

      this.$legend = $('#legend');

      this.setMap();
      this.setListeners();
    },

    setListeners: function() {
      Backbone.Events.on('indicators:change', this.setLayer, this);
    },

    setMap: function() {
      this.map = L.map(this.el, this.options.map);
      L.tileLayer(this.options.urlTiles).addTo(this.map);
    },

    setLayer: function(layer) {
      var cboptions;

      this.removeLegend();

      if (this.layer) {
        this.layer.hide();
      }

      if (!this.layers.hasOwnProperty(layer)) {
        return false;
      }

      if (this.layer) {
        this.layer.setSQL(this.layers[layer].sql);
        this.layer.setCartoCSS(this.layers[layer].cartocss);
        this.setLegend();
        this.layer.show();
      } else {
        cboptions = _.defaults({sublayers: [this.layers[layer]]}, this.options.cartodb);

        cartodb.createLayer(this.map, cboptions)
          .addTo(this.map)
          .on('done', _.bind(function(layer) {
            this.layer = layer.getSubLayer(0);
            this.setInfowindow(cboptions.sublayers[0].interactivity);
            this.setLegend();
            this.layer.show();
          }, this))
          .on('error', function(err) {
            console.log('some error occurred: ' + err);
          });
      }

    },

    setInfowindow: function(interactivity) {
      this.infowindow = cdb.vis.Vis.addInfowindow(this.map, this.layer, interactivity, {
        infowindowTemplate: infowindowTpl
      });
    },

    setLegend: function() {
      var legend;

      $.get(this.getLegendUrl(), {
        q: 'SELECT min(porcent_envejecimiento), max(porcent_envejecimiento) FROM poblacion_anciana'
      }, _.bind(function(data) {
        legend = new cdb.geo.ui.Legend({
          type: 'choropleth',
          data: [
            { value: data.rows[0].min + '%' },
            { value: data.rows[0].max + '%' },
            { value: '#eeeeee' },
            { value: '#e49d95' },
            { value: '#db4c3f' },
            { value: '#8c3a32' },
            { value: '#3c2825' }
          ]
        });

        this.$legend.html(legend.render().el);
      }, this));
    },

    removeLegend: function() {
      this.$legend.html('');
    },

    getLegendUrl: function() {
      return _.str.sprintf('//%(user)s.cartodb.com/api/v1/sql', {
        user: sessionStorage.getItem('citizen:cartodbuser')
      });
    }

  });

  return MapView;

});
