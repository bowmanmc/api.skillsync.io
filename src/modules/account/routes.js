'use strict';

var handlers = require('./handlers');

module.exports = [{
    method: 'POST',
    path: '/account/isregistered',
    handler: handlers.isRegistered
}];
