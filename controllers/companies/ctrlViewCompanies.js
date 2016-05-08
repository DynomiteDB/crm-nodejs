'use strict';

var async = require('async');
var cache = require('../../lib/cache');
var key = require('../../lib/companyKey');
var murmurhash = require('murmurhash');

module.exports = function(req, res) {

    // Get the first 10 companies sorted alphabetically
    cache.zrange(murmurhash.v2('companies:alphabetical'), 0, 9, getCompaniesDetails);

    function getCompaniesDetails(err, reply) {
        // Production code should have logging, retry, etc.
        if (err) { console.log(err); }

        var emptyResult = false;

        if (reply) {
            async.map(reply, getDetails, displayCompanies);
        } else {
            res.render('companies/index', {
                noResults: true
            });
        }
    }

    function getDetails(companyName, cb) {
        cache.hgetall(key.getKeyHash(companyName), function(err, reply) {
            if (err) { cb(err, {}); }
            cb(null, reply)
        });
    }

    function displayCompanies(err, results) {
        if (err) { console.log(err) }

        res.render('companies/index', {
            companies: results
        });
    }

};
