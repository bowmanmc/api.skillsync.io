'use strict';
/**
 * reset
 *
 * API for resetting passwords
 */
const   Boom = require('boom');

const emails = require('../email');
const  logic = require('../logic');
const models = require('../models');
const  utils = require('../../../utils');


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
            // the token isn't hashed until it's saved...
            const email = emails.reset(account, password.token);
            const title = 'Forget Something? Reset your SkillSync.io password here!';

            password.save(function(errors) {
                if (errors) {
                    reply(Boom.badImplementation(errors));
                }

                utils.sendEmail(account.email, title, email);

                reply({
                    success: true
                });
            });
        });
    });
};
