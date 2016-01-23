'use strict';
/**
 * lookup
 */
var Boom = require('boom');

var models = require('../models');


module.exports = function(request, reply) {

    // Make sure the user is trying to update their own account...
    var urlId = request.params.accountId;
    var accountId = request.auth.credentials.accountId;

    if (urlId !== accountId) {
        reply(Boom.forbidden('No access to resume for ' + urlId));
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

        reply(resume.toJSON());
    });
};
