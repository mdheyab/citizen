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
      // urlTiles: 'https://cartocdn_{s}.global.ssl.fastly.net/base-dark/{z}/{x}/{y}.png',
      urlTiles: 'https://{s}.tiles.mapbox.com/v4/casius.jifc84jf/{z}/{x}/{y}@2x.png?access_token=pk.eyJ1IjoiY2FzaXVzIiwiYSI6ImJDMkpucTQifQ.5rm4_TsT8_PH8TzOY2V3FQ',
      map: {
        center: [40.417111100000000000, -3.703113300000041000], // Puerta del Sol
        zoom: 11,
        zoomControl: false,
        scrollWheelZoom: false,
        doubleClickZoom: false,
        touchZoom: false
      },
      cartodb: {
        'user_name': sessionStorage.getItem('citizen:cartodbuser'),
        type: 'cartodb',
        sublayers: []
      }
    },

    initialize: function() {
      this.sql = new cartodb.SQL({ user: this.options.cartodb['user_name'] });
      this.layers = new LayersCollection();
      this.$legend = $('#legend');

      this.setMap();
      this.setListeners();
    },

    setListeners: function() {
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
        this.removeInfowindow();
      }

      if (!this.currentLayer) {
        return false;
      }

      cboptions = _.defaults({sublayers: [this.currentLayer.toJSON()]}, this.options.cartodb);

      if (this.layer) {
        this.layer.setSQL(this.currentLayer.get('sql'));
        this.layer.setCartoCSS(this.currentLayer.get('cartocss'));
        this.setInfowindow(cboptions.sublayers[0].interactivity);
        this.setLegend();
        this.layer.show();
      } else {
        cartodb.createLayer(this.map, cboptions)
          .addTo(this.map)
          .on('done', _.bind(function(layer) {
            this.layer = layer.getSubLayer(0);
            this.setInfowindow(cboptions.sublayers[0].interactivity);
            this.setBounds();
            this.setLegend();
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

    removeInfowindow: function() {
      this.infowindow.remove();
    },

    setLegend: function() {
      var legend,
        color = this.currentLayer.get('color');

      this.sql
        .execute(_.str.sprintf(
          'SELECT min(value), max(value) FROM %s',
          this.currentLayer.get('table')
        ))
        .done(_.bind(function(data) {
          legend = new cdb.geo.ui.Legend({
            type: 'choropleth',
            data: [
              { value: data.rows[0].min + '%' },
              { value: data.rows[0].max + '%' },
              { value: color },
              { value: color },
              { value: color },
              { value: color },
              { value: color }
            ]
          });

          this.$legend.html(legend.render().el);
        }, this));
    },

    removeLegend: function() {
      this.$legend.html('');
    },

    setBounds: function() {
      this.sql
        .getBounds('SELECT the_geom FROM distritos')
        .done(_.bind(function(bounds) {
          this.map.fitBounds(bounds, {
            paddingTopLeft: [200, 0]
          });
        }, this));
    }

  });

  return MapView;

});
