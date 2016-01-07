'use strict';
/**
 * reset
 *
 * API for resetting passwords
 */
var   Boom = require('boom');

var  logic = require('../logic');
var models = require('../models');


module.exports = function(request, reply) {

    var payload = request.payload;

    models.Account.findByEmail(payload.email, function(account) {
        if (!account) {
            reply(Boom.notFound(`No account found for "${payload.email}"`));
            return;
        }

        // We got a user, lookup the corresponding password record
        models.Password.findByUserId(account._id, function(password) {
            if (!password) {
                reply(Boom.notFound(`No password found for "${payload.email}"`));
                return;
            }

            logic.resetPassword(password);
            var token = password.password;
            // need to email the token to the user...

            password.save(function(errors) {
                if (errors) {
                    reply(Boom.badImplementation(errors));
                }
                reply({
                    success: true
                });
            });
        });
    });
};
