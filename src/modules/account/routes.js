'use strict';

var handlers = require('./handlers');
var validators = require('./validators');


module.exports = [{
    path: '/account/registered',
    method: 'POST',
    handler: handlers.registered,
    config: {
        validate: {
            payload: validators.isRegistered
        }
    }
}, {
    path: '/account/register',
    method: 'POST',
    handler: handlers.register,
    config: {
        validate: {
            payload: validators.register
        }
    }
}];
