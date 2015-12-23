'use strict';

var handlers = require('./handlers');

module.exports = [{
    path: '/api/hello',
    method: 'GET',
    handler: handlers.hello
}];
