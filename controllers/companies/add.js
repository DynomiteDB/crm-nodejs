'use strict';

var ctrlShowAddCompanyForm = require('./ctrlShowAddCompanyForm');

module.exports = function(router) {
    router.get('/', ctrlShowAddCompanyForm);
};
