'use strict';

module.exports = function watch(grunt) {
  grunt.loadNpmTasks('grunt-contrib-watch');

  return {
      serve: {
          watch: {
              src: {
                  files: [
                      'config/***/*.json',
                      'controllers/**/*.js',
                      'lib/*.js',
                      'public/css/*.css',
                      'public/js/*.js',
                      'public/templates/**/*.dust',
                      '../public/templates/**/*.dust'
                  ],
                  tasks: ['express:dev'],
                  options: {
                      nospawn: true,
                      livereload: true
                  }
              }
          }
      }
  };
};
