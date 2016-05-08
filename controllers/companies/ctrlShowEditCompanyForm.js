'use strict';

var cache = require('../../lib/cache');
var key = require('../../lib/companyKey');
var murmurhash = require('murmurhash');
var slug = require('slug');

module.exports = function(req, res) {

    cache.hgetall(key.getKeyHash(req.params.slug), showEditCompanyForm);

    function showEditCompanyForm(err, reply) {
        // Production code should have logging, retry, etc.
        if (err) { console.log(err); }

        if (reply) {
            // Convert type for simplified template logic
            reply.qualified = (reply.qualified === 'true');
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

        console.log(reply);

        res.render('companies/edit', reply);
    }

};
