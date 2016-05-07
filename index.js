'use strict';

var express = require('express');
var kraken = require('kraken-js');
// var session = require('express-session');
// var lusca = require('lusca');

var options, app;

/*
 * Create and configure application. Also exports application instance for use by tests.
 * See https://github.com/krakenjs/kraken-js#options for additional configuration options.
 */
options = {
    onconfig: function (config, next) {
        /*
         * Add any additional config setup or overrides here. `config` is an initialized
         * `confit` (https://github.com/krakenjs/confit/) configuration object.
         */
        next(null, config);
    }
};

app = module.exports = express();
app.use(kraken(options));

// app.use(session({
//     secret: 'abc123',
//     resave: true,
//     saveUninitialized: true
// }));
//
// app.use(lusca({
//     csrf: true,
//     csp: {
//         policy: {
//             'default-src': '\'self\'',
//             'img-src': '*'
//         }
//     },
//     xframe: 'SAMEORIGIN',
//     p3p: 'ABCDEF',
//     hsts: {maxAge: 31536000, includeSubDomains: true, preload: true},
//     xssProtection: true,
//     nosniff: true
// }));

app.on('start', function () {
    console.log('Application ready to serve requests.');
    console.log('Environment: %s', app.kraken.get('env:env'));
});
