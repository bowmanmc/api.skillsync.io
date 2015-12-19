'use strict';

var handlers = require('./handlers');

module.exports = [{
    method: 'GET',
    path: '/hello',
    handler: handlers.hello
}];
