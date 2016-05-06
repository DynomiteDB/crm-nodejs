'use strict';

var config = require('../config/config.json');
var db = require('redis').createClient(config.database);

db.on('error', function (err) {
    console.log('Error ' + err);
});

db.on('connect', function() {
    console.log('Connected to DynomiteDB database server');
});

module.exports = db;
