module.exports = function(grunt) {

  'use strict';

  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    root: {
      app: './public/app',
      tmp: './public/.tmp',
      dist: './public/dist',
      test: './test'
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        '*.js',
        'app/controllers/{,*/}*.js',
        'app/config/{,*/}*.js',
        '<%= root.app %>/scripts/{,*/}*.js',
        '<%= root.test %>/{,*/}*.js'
      ]
    },

    stylus: {
      options: {
        use: [
          function() {
            return require('autoprefixer-stylus')({browsers: 'last 2 versions'});
          },
          require('fluidity')
        ]
      },
      server: {
        files: {
          '<%= root.tmp %>/styles/main.css': '<%= root.app %>/styles/main.styl'
        }
      }
    },

    concurrent: {
      server: ['stylus:server']
    },

    watch: {
      options: {
        spawn: false
      },
      scripts: {
        files: '<%= jshint.all %>',
        tasks: ['jshint']
      },
      styles: {
        files: ['<%= root.app %>/styles/{,*/}*.styl'],
        tasks: ['stylus:server']
      }
    }

  });

  grunt.registerTask('test', [
    'jshint'
  ]);

  grunt.registerTask('server', [
    'test',
    'concurrent:server',
    'watch'
  ]);

  grunt.registerTask('heroku', [
    'stylus:server'
  ]);

};
