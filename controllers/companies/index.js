'use strict';

var cache = require('../../lib/cache');

// Controllers
var ctrlViewCompanyDetails = require('./ctrlViewCompanyDetails');
var ctrlViewCompanies = require('./ctrlViewCompanies');
var ctrlShowEditCompanyForm = require('./ctrlShowEditCompanyForm');

module.exports = function(router) {
    router.get('/', ctrlViewCompanies);
    router.get('/:slug', ctrlViewCompanyDetails);
    router.get('/:slug/edit', ctrlShowEditCompanyForm);
};
