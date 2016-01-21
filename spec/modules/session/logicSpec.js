'use strict';

var src = '../../../src';
var Account = require(src + '/modules/account/models/Account');
var Session = require(src + '/modules/session/models/Session');
var logic = require(src + '/modules/session/logic');

var acctFixture = require('../account/models/accountFixture');


describe('session.logic', function() {

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
