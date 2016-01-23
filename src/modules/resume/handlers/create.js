'use strict';
/**
 * create
 *
 * API for creating new resumes
 */
var Boom = require('boom');

var models = require('../models');


module.exports = function(request, reply) {

    // Make sure the user is trying to update their own account...
    var accountId = request.auth.credentials.accountId;

    var payload = request.payload;
    var resume = new models.Resume(payload);

    // don't let the user change the accountId!
    resume.accountId = accountId;

    resume.save(function(error) {

        if (error) {
            console.log('ERROR: resume.save()', error);
            reply(Boom.badRequest(error.errmsg));
            return;
        }

        reply({
            accountId: resume.accountId
        });
    }); // resume.save()

};
