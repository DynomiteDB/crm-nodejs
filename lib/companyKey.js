'use strict';

var murmurhash = require('murmurhash');
var slug = require('slug');

function getKeyText(input) {
    // Generate text key
    return 'company:name=' + slug(input.toLowerCase());
}

function getKeyHash(input) {
    return murmurhash.v2(getKeyText(input));
}

module.exports = {
    getKeyText: getKeyText,
    getKeyHash: getKeyHash
};
