// Global variables
sessionStorage.setItem('citizen:cartodbuser', 'davidsingal');

// Require Config
require.config({

  baseUrl: '/app/scripts',

  paths: {
    jquery: '../../bower_components/jquery/dist/jquery',
    underscore: '../../bower_components/underscore/underscore',
    underscoreString: '../../bower_components/underscore.string/lib/underscore.string',
    backbone: '../../bower_components/backbone/backbone',
    classjs: '../../bower_components/class.js/src/class',
    handlebars: '../../bower_components/handlebars/handlebars',
    text: '../../bower_components/text/text'
  },

  shim: {
    jquery: {
      exports: '$'
    },
    underscore: {
      exports: '_'
    },
    underscoreString: {
      deps: ['underscore'],
      exports: '_'
    },
    backbone: {
      deps: ['jquery', 'underscore'],
      exports: 'Backbone'
    },
    handlebars: {
      exports: 'Handlebars'
    },
    classjs: {
      exports: 'Class'
    }
  }

});
