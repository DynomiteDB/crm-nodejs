/*
    Database and cache calls are sequential in this file to facilitate learning.
    However, a production implementation would use Rx or `async` to parallelize
    the
 */
'use strict';

var cache = require('../../lib/cache');
var murmurhash = require('murmurhash');
var slug = require('slug');

module.exports = function saveCompany(req, res) {
    // Get the company
    var company = {
        name: req.body.name,
        phone: req.body.phone,
        website: req.body.website,
        revenue: req.body.revenue,
        step: req.body.step,
        qualified: req.body.qualified ? true : false
    };

    // Generate text key
    var keyText = 'company:name=' + slug(company.name.toLowerCase());

    // Generate hashed key
    var keyHash = murmurhash.v2(keyText);

    // The two lines above are here for learning purposes only. A cleaner
    // implementation is to replace `keyHash` below with:
    // key.getKeyHash(company.name);

    // Save Company
    cache.hmset(keyHash,
        'name', company.name,
        'phone', company.phone,
        'website', company.website,
        'revenue', company.revenue,
        'step', company.step,
        'qualified', company.qualified.toString(),
        saveToRecentCompanies
    );

    function saveToRecentCompanies(err, reply) {
        // Production code would have logging, retry, etc.
        if (err) { console.log(err); }

        cache.lpush(
            murmurhash.v2('companies:recent'),
            company.name,
            saveToAlphabetical
        );
    }

    function saveToAlphabetical(err, reply) {
        // Production code would have logging, retry, etc.
        if (err) { console.log(err); }

        cache.zadd(
            murmurhash.v2('companies:alphabetical'),
            1,
            company.name,
            saveToRevenue
        );
    }

    function saveToRevenue(err, reply) {
        // Production code would have logging, retry, etc.
        if (err) { console.log(err); }

        cache.zadd(
            murmurhash.v2('companies:revenue'),
            company.revenue,
            company.name,
            renderNextPage
        );
    }

    function renderNextPage(err, reply) {
        // Production code would have logging, retry, etc.
        if (err) { console.log(err); }

        res.redirect('/companies?saved=' + encodeURI(company.name));
    }
};
