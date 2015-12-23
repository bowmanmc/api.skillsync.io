'use strict';
/**
 * register
 * 
 * API for creating new accounts
 */
var Boom = require('boom');

var  Account = require('../Account');
var Password = require('../Password');


module.exports = function(request, reply) {

    var payload = request.payload;
    var account = new Account(payload);
    var password = new Password(payload);

    account.save(function(error) {

        if (error) {
            console.log('ERROR: account.save()', error);
            reply(Boom.badRequest(error.errmsg));
            return;
        }

        password.userId = account._id;

        password.save(function(error) {
            if (error) {
                console.log('Error saving password!', error);
                reply(Boom.badRequest(error.errmsg));
                console.log('Deleting account ' + account._id + 
                            ' due to password error on save.');
                account.remove();
            }

            reply({
                accountId: account._id
            });
        }); // password.save()
    }); // account.save()

};
