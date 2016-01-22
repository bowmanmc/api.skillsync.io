'use strict';

var src = '../../../../src/modules/account';
var Account = require(src + '/models/Account');
var Session = require(src + '/models/Session');
var logic = require(src + '/logic');

var acctFixture = require('../models/accountFixture');


describe('account.logic.login', function() {

    beforeEach(function() {
        // Make sure the collection is empty
        Session.remove({}, function(err) {
            if (err) {
                console.log('Error dropping collection!', err);
            }
        });
        Account.remove({}, function(err) {
            if (err) {
                console.log('Error dropping collection!', err);
            }
        });
    });

    afterEach(function() {
        // Clean up after ourselves
        Session.remove({}, function(err) {
            if (err) {
                console.log('Error dropping collection!', err);
            }
        });
        Account.remove({}, function(err) {
            if (err) {
                console.log('Error dropping collection!', err);
            }
        });
    });

    it('should generate a token', function(done) {
        var account = new Account(acctFixture);
        account.save(function() {
            logic.login(account, function(err, result) {
                expect(result).not.toBe(null);
                done();
            });
        });
    });
});
