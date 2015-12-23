'use strict';
/**
 * registered
 * 
 * API for checking to see if an email is registered
 */

var Account = require('../Account');


var irFalse = {
    'registered': false
};

var irTrue = {
    'registered': true
};


module.exports = function(request, reply) {

    // Check the database for a record with the passed in email
    Account.findByEmail(request.payload.email, function(err, result) {
        if (result) {
            reply(irTrue);
        }
        else {
            reply(irFalse);
        }
    });

};
