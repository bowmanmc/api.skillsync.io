'use strict';
/**
 * isRegistered
 * 
 * API for checking to see if an email is registered
 */
var Account = require('../Account');


var irFalse = {
    'isRegistered': false
};

var irTrue = {
    'isRegistered': true
};


module.exports = function(request, reply) {
    // Validate request params
    if (!request.params.email ||
        request.params.email.length < 3 ||
        request.params.email.indexOf('@') < 0
    ) {
        // invalid email parameter
        reply(irFalse);
        return; // no need to check the database
    }

    // Check the database for a record with the passed in email
    Account.findByEmail(request.params.email, function(err, result) {
        if (result) {
            reply(irTrue);
        }
        else {
            reply(irFalse);
        }
    });

};
