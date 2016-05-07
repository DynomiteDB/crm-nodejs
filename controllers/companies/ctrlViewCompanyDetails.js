'use strict';

var cache = require('../../lib/cache');
var key = require('../../lib/companyKey');
var murmurhash = require('murmurhash');
var slug = require('slug');

module.exports = function(req, res) {
    // Force slug to lowercase (slug library is not doing this for us?)
    var keyText = 'company:name=' + slug(req.params.slug.toLowerCase());
    var keyHash = murmurhash.v2(keyText);

    cache.hgetall(key.getKeyHash(req.params.slug), showCompany);

    function showCompany(err, reply) {
        // Production code should have logging, retry, etc.
        if (err) console.log(err);

        if (reply) {
            // Convert type for simplified template logic
            reply.qualified = reply.qualified === 'true' ? true : false;
        } else {
            reply = {
                name: 'Not found',
                phone: 'Not found',
                website: 'Not found',
                revenue: 0,
                step: 'Not found',
                qualified: false
            }
        }

        res.render('companies/details', reply);
    }
};
