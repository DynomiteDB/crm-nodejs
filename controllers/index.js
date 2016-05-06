'use strict';

var cache = require('../lib/cache');

module.exports = function (router) {

    router.get('/', function (req, res) {

        cache.get('name', function(err, reply) {
            var username;

            // Switch to render a 503 page
            if (err) console.log(err);

            if (reply) {
                username = reply;
            } else {
                username = 'not found';
            }

            res.render('index', {
                name: 'index',
                username: username
            });
        });
    });

};
