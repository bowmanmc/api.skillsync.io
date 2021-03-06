'use strict';

var handlers = require('./handlers');
var validators = require('./validators');


module.exports = [{
    path: '/api/resume',
    method: 'POST',
    handler: handlers.create,
    config: {
        auth: 'jwt', // creating a resume
        validate: {
            payload: validators.create
        }
    }
}, {
    path: '/api/resume/{accountId}',
    method: 'PATCH',
    handler: handlers.update,
    config: {
        auth: 'jwt', // updating an resume
        validate: {
            payload: validators.update
        }
    }
}, {
    path: '/api/resume/{accountId}',
    method: 'GET',
    handler: handlers.lookup,
    config: {
        auth: 'jwt' // get resume details
    }
}];
