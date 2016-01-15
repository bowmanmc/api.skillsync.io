'use strict';

var handlers = require('./handlers');
var validators = require('./validators');


module.exports = [{
    path: '/account/registered',
    method: 'POST',
    handler: handlers.registered,
    config: {
        validate: {
            payload: validators.registered
        }
    }
}, {
    path: '/account',
    method: 'POST',
    handler: handlers.register,
    config: {
        validate: {
            payload: validators.register
        }
    }
}, {
    path: '/account/{accountId}',
    method: 'PATCH',
    handler: handlers.update,
    config: {
        validate: {
            payload: validators.update
        }
    }
}];
