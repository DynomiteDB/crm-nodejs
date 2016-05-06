'use strict';

var config = require('../config/config.json');
var cache = require('redis').createClient(config.cache);

cache.on('error', function (err) {
    console.log('Error ' + err);
});

cache.on('connect', function() {
    console.log('Connected to DynomiteDB cache server');
});

module.exports = cache;
