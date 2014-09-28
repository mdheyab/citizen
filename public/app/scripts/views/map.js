define([
  'underscoreString',
  'backbone',
  'collections/layers',
  'text!templates/infowindow.handlebars'
], function(_, Backbone, LayersCollection, infowindowTpl) {

  'use strict';

  var MapView = Backbone.View.extend({

    el: '#mapView',

    options: {
      urlCartoDB: _.str.sprintf('//%(user)s.cartodb.com/api/v1/sql', {
        user: sessionStorage.getItem('citizen:cartodbuser')
      }),
      urlTiles: 'https://cartocdn_{s}.global.ssl.fastly.net/base-dark/{z}/{x}/{y}.png',
      // urlTiles: 'https://{s}.tiles.mapbox.com/v4/casius.jifc84jf/{z}/{x}/{y}@2x.png?access_token=pk.eyJ1IjoiY2FzaXVzIiwiYSI6ImJDMkpucTQifQ.5rm4_TsT8_PH8TzOY2V3FQ',
      map: {
        // center: [40.417111100000000000, -3.703113300000041000],
        center: [40.4370180276586, -3.841781616210937],
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
      this.layers = new LayersCollection();
      this.$legend = $('#legend');

      this.setMap();
      this.setListeners();
    },

    setListeners: function() {
      // Backbone.Events.on('indicators:change', this.setLayer, this);
      Backbone.Events.on('presenter:change', this.setLayer, this);
    },

    setMap: function() {
      this.map = L.map(this.el, this.options.map);
      L.tileLayer(this.options.urlTiles).addTo(this.map);
    },

    setLayer: function(presenter) {
      var cboptions;

      this.removeLegend();

      this.currentLayer = this.layers.findWhere({'slug': presenter.get('layer')});

      if (this.layer) {
        this.layer.hide();
        this.infowindow.remove();
      }

      if (!this.currentLayer) {
        return false;
      }

      cboptions = _.defaults({sublayers: [this.currentLayer.toJSON()]}, this.options.cartodb);

      if (this.layer) {
        this.layer.setSQL(this.currentLayer.get('sql'));
        this.layer.setCartoCSS(this.currentLayer.get('cartocss'));
        this.setInfowindow(cboptions.sublayers[0].interactivity);
        // this.setLegend();
        this.layer.show();
      } else {
        cartodb.createLayer(this.map, cboptions)
          .addTo(this.map)
          .on('done', _.bind(function(layer) {
            this.layer = layer.getSubLayer(0);
            this.setInfowindow(cboptions.sublayers[0].interactivity);
            // this.setLegend();
          }, this))
          .on('error', function(err) {
            console.log('some error occurred: ' + err);
          });
      }

    },

    setInfowindow: function(interactivity) {
      this.infowindow = cdb.vis.Vis.addInfowindow(this.map, this.layer, interactivity, {
        infowindowTemplate: _.str.sprintf(infowindowTpl, {
          layer: this.currentLayer.get('slug')
        })
      });
    },

    setLegend: function() {
      var legend;

      $.get(this.options.urlCartoDB, {
        q: 'SELECT min(porcent_envejecimiento), max(porcent_envejecimiento) FROM poblacion_anciana'
      }, _.bind(function(data) {
        legend = new cdb.geo.ui.Legend({
          type: 'choropleth',
          data: [
            { value: data.rows[0].min + '%' },
            { value: data.rows[0].max + '%' },
            { value: '#dd4b39' },
            { value: '#dd4b39' },
            { value: '#dd4b39' },
            { value: '#dd4b39' },
            { value: '#dd4b39' }
          ]
        });

        this.$legend.html(legend.render().el);
      }, this));
    },

    removeLegend: function() {
      this.$legend.html('');
    }

  });

  return MapView;

});
