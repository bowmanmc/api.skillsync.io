'use strict';

var mongoose = require('mongoose');
var config = require('./config');
config.connect2mongo();

describe('Database', function() {

    it('can connect to mongo', function() {
        expect(mongoose.connection.readyState).not.toBe(null);
    });

});

