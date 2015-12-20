'use strict';
/**
 * isRegistered
 * 
 * API for checking to see if an email is registered
 */

var  Account = require('../Account');

var irFalse = {
    'isRegistered': false
};
var irTrue = {
    'isRegistered': true
};

module.exports = function(request, reply) {
    // Validate request params
    if (typeof request === 'undefined' ||
        typeof request.params === 'undefined' ||
        typeof request.params.email === 'undefined' ||
        request.params.email === null ||
        request.params.email.length < 3 ||
        request.params.email.indexOf('@') < 0
    ) {
        // invalid email parameter
        reply(irFalse);
    }

    Account.findByEmail(request.params.email, function(err, result) {
        if (result) {
            reply(irTrue);
        }
        else {
            reply(irFalse);
        }
    });
};
