'use strict';

var handlers = require('./handlers');

module.exports = [{
    method: 'GET',
    path: '/api/hello',
    handler: handlers.hello
}];
