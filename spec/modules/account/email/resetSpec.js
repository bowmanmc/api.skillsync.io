'use strict';

var src = '../../../../src';
var resetEmail = require(src + '/modules/account/email/reset');
var utils = require(src + '/utils');

var accountFixture = require('../models/accountFixture');


describe('account.email.reset', function() {

    it('should send generate reset emails', function() {
        var tokenLength = 8;
        var token = utils.generateToken(tokenLength);

        var emailTxt = resetEmail(accountFixture, token);

        expect(emailTxt).toContain(token);
        expect(emailTxt).toContain(accountFixture.email);
    });

});
