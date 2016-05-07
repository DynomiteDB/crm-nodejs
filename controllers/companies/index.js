'use strict';

var cache = require('../../lib/cache');

// Controllers
var ctrlShowCompanyDetails = require('./ctrlShowCompanyDetails');
var ctrlViewCompanies = require('./ctrlViewCompanies');

module.exports = function(router) {
    router.get('/', ctrlViewCompanies);
    router.get('/:slug', ctrlShowCompanyDetails);
};
