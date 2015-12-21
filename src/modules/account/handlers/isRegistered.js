'use strict';
/**
 * isRegistered
 * 
 * API for checking to see if an email is registered
 */

var Account = require('../Account');
var validators = require('../validators');


var irFalse = {
    'isRegistered': false
};

var irTrue = {
    'isRegistered': true
};


module.exports = function(request, reply) {

    validators.checkEmail(request.params.email, function(errors) {
        if(errors) {
            // invalid email parameter
            reply(irFalse);
        }
        else {
            // Check the database for a record with the passed in email
            Account.findByEmail(request.params.email, function(err, result) {
                if (result) {
                    reply(irTrue);
                }
                else {
                    reply(irFalse);
                }
            });
        }
    });

};
