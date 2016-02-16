'use strict';
/**
 * update
 *
 * patch method called on /account/{accountId}
 */
var Boom = require('boom');

var logic = require('../logic');
var models = require('../models');


module.exports = function(request, reply) {

    // Make sure the user is trying to update their own account...
    var urlId = request.params.accountId;
    var accountId = request.auth.credentials.accountId;

    if (urlId !== accountId) {
        reply(Boom.forbidden('No access to update account ' + urlId));
        return;
    }

    models.Account.findById(accountId, function(err, account) {
        if (!err && !account) {
            // accountId not found!
            reply(Boom.notFound('No account found with id ' + accountId));
            return;
        }

        if (err) {
            reply(Boom.badImplementation(err.message));
            return;
        }

        // Ok, we have a valid account. Update it
        logic.updateAccount(account, request.payload);
        account.save(function(err) {
            if (err) {
                reply(Boom.badImplementation(err.message));
                return;
            }
            reply(accountId).code(200);
        });
    });
};
