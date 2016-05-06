'use strict';


module.exports = function express(grunt) {
    // Load task
    grunt.loadNpmTasks('grunt-express-server');

    // Options
    return {
        express: {
            dev: {
                options: {
                    script: './index.js',
                    node_env: 'development'
                }
            }
        }
    };
};
