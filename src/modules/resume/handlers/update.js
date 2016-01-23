'use strict';
/**
 * update
 *
 * patch method called on /resume/{accountId}
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

    models.Resume.findByAccountId(accountId, function(err, resume) {
        if (!err && !resume) {
            // resume not found!
            reply(Boom.notFound('No resume found with id ' + accountId));
            return;
        }

        if (err) {
            reply(Boom.badImplementation(err.message));
            return;
        }

        // Ok, we have a valid account. Update it
        logic.updateResume(resume, request.payload);
        resume.save(function() {
            reply(accountId).code(200);
        });
    });
};
