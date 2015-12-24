'use strict';

var utils = require('../src/utils');

describe('Utils', function() {

    it('should generate good tokens', function() {
        var token = utils.generateToken(8);
        expect(token).not.toBeNull();
        expect(token.length).toBe(8);
    });

});
