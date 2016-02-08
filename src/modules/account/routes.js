'use strict';

var handlers = require('./handlers');
var validators = require('./validators');


module.exports = [{
    path: '/api/account',
    method: 'POST',
    handler: handlers.register,
    config: {
        auth: false, // creating an account
        validate: {
            payload: validators.register
        }
    }
}, {
    path: '/api/account/{accountId}',
    method: 'PATCH',
    handler: handlers.update,
    config: {
        auth: 'jwt', // updating an account
        validate: {
            payload: validators.update
        }
    }
}, {
    path: '/api/account/{accountId}',
    method: 'GET',
    handler: handlers.lookup,
    config: {
        auth: 'jwt' // get account details
    }
}, {
    path: '/api/account/authenticate',
    method: 'POST',
    handler: handlers.authenticate,
    config: {
        auth: false, // signing in
        validate: {
            payload: validators.authenticate
        }
    }
}, {
    path: '/api/account/registered',
    method: 'POST',
    handler: handlers.registered,
    config: {
        auth: false, // checking if an email is registered already
        validate: {
            payload: validators.registered
        }
    }
}, {
    path: '/api/account/signout',
    method: 'POST',
    handler: handlers.signout,
    config: {
        // should we require auth to sign out?
        auth: false,
        validate: {
            payload: validators.signout
        }
    }
}];
