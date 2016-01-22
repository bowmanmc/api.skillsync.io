'use strict';
/**
 * register
 *
 * API for creating new accounts
 */
var Boom = require('boom');

var logic = require('../logic');
var models = require('../models');


module.exports = function(request, reply) {

    var payload = request.payload;
    var account = new models.Account(payload);
    var password = new models.Password(payload);

    account.save(function(error) {

        if (error) {
            console.log('ERROR: account.save()', error);
            reply(Boom.badRequest(error.errmsg));
            return;
        }

        password.accountId = account._id;

        password.save(function(error) {
            if (error) {
                console.log('Error saving password!', error);
                reply(Boom.badRequest(error.errmsg));
                console.log('Deleting account ' + account._id +
                            ' due to password error on save.');
                account.remove();
            }
            else {
                // Initialize the session and return the jwt token
                logic.login(account, function(err, token) {
                    if (err) {
                        reply(Boom.badImplementation(err));
                        return;
                    }

                    // This is the success condition! We've created an account,
                    // a password, a session, and a jwt token.
                    reply({
                        accountId: account._id,
                        token: token
                    });

                }); // sessionLogic.login
            }
        }); // password.save()
    }); // account.save()

};
