'use strict';

var cache = require('../lib/cache');

module.exports = function (router) {

    router.get('/', function (req, res) {

        cache.get('name', function(err, reply) {
            var username;

            if (err) return err;

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
