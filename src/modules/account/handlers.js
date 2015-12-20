'use strict';
/**
 * Handlers for requests to /account/*
 * Operations:
 *      - isRegistered - is email address available?
 *      - register - create an account and password
 *      - verify - verify a newly created account
 *      - reset - reset a password (forgot password)
 *      - edit - edit an account
 *      - changepass - change password (send notice email)
 *      - login - sign into account (generate jwt)
 *      - logout - sign out of account (invalidate jwt)
 */
var  Account = require('./Account');

var irFalse = {
    'isRegistered': false
};
var irTrue = {
    'isRegistered': true
};

module.exports = {

    isRegistered: function(request, reply) {
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
    }

};
