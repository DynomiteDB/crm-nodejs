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
        if (err) {
            // Production code would have logging, retry, etc.
            console.log(err);
        }

        res.render('companies/index', {});
    }
};
