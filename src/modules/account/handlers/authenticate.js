'use strict';
/**
 * authenticate
 *
 * API for authenticating email/password combinations. Returns a JWT token
 * that can then be sent as authorization to restricted resources.
 */
var Boom = require('boom');

var logic = require('../logic');
var Account = require('../models/Account');
var Password = require('../models/Password');


module.exports = function(request, reply) {

    var args = request.payload;

    var email = args.email;
    var candidate = '' + args.password.trim();

    Account.findByEmail(email, function(err, account) {
        if (err || !account) {
            // Account not found
            reply(Boom.notFound(`No account found for "${ email }"`));
            return;
        }

        // Check the password...
        Password.checkPassword(account._id, candidate, function(err, result) {
            if (err || !result) {
                // Password doesn't match
                reply(Boom.notFound(`No account found for "${ email }" with that password.`));
                return;
            }

            // Initialize the session and return the jwt token
            logic.login(account, function(err, token) {
                if (err) {
                    reply(Boom.badImplementation(err));
                    return;
                }

                reply({
                    token: token
                });

            }); // sessionLogic.login
        }); // Password.checkPassword
    }); // Account.findByEmail
};
