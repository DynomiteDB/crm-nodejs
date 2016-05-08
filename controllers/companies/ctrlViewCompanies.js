'use strict';

var async = require('async');
var cache = require('../../lib/cache');
var key = require('../../lib/companyKey');
var murmurhash = require('murmurhash');
var slug = require('slug');

module.exports = function(req, res) {

    // Display success message for saved company
    var savedCompany = '';
    var showSaved = false;

    if (req.query.saved) {
        savedCompany = req.query.saved;
        showSaved = true;
    }

    // How should we sort the companies. Default is alphabetical.
    var sort = 'az';
    if (req.query.sort) {
        switch (req.query.sort) {
            case 'revenue':
                sort = 'revenue';
                break;
            case 'recent':
                sort = 'recent';
                break;
            case 'az':
                sort = 'az';
                break;
        }
    }

    if (sort === 'az') {
        // Get the first 10 companies sorted alphabetically
        cache.zrange(murmurhash.v2('companies:alphabetical'), 0, 9, getCompaniesDetails);
    } else if (sort === 'revenue') {
        // Get the reverse range to companies are sorted from high to low revenue
        cache.zrevrange(murmurhash.v2('companies:revenue'), 0, 9, getCompaniesDetails);
    } else if (sort === 'recent') {
        cache.lrange(murmurhash.v2('companies:recent'), 0, 9, getCompaniesDetails);
    }

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

            if (reply) {
                reply.slug = slug(reply.name.toLowerCase());
                reply.qualified = (reply.qualified === 'true');
            }
            cb(null, reply)
        });
    }

    function displayCompanies(err, results) {
        if (err) { console.log(err) }

        res.render('companies/index', {
            companies: results,
            showSaved: showSaved,
            savedCompany: savedCompany
        });
    }

};
