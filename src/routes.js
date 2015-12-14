'use strict';

var hello = require('./handlers/hello');

module.exports = [{
    method: 'GET',
    path: '/hello',
    handler: hello
}];
