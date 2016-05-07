'use strict';

var ctrlSaveCompany = require('./ctrlSaveCompany');

module.exports = function(router) {
    router.post('/', ctrlSaveCompany);
};
