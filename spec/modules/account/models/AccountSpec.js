'use strict';

var Account = require('../../../../src/modules/account/models/Account');
var testFixture = require('./accountFixture');


describe('account.models.Account', function() {

    beforeEach(function() {
        // Make sure the collection is empty
        Account.remove({}, function(err) {
            if (err) {
                console.log('Error dropping account collection!', err);
            }
        });
    });

    afterEach(function() {
        // Clean up after ourselves
        Account.remove({}, function(err) {
            if (err) {
                console.log('Error dropping account collection!', err);
            }
        });
    });

    it('can create an account', function(done) {
        var testAccount = new Account(testFixture);
        testAccount.save(function() {
            expect(testAccount._id).not.toBe(null);
            expect(testAccount.created).not.toBe(null);
            expect(testAccount.updated).not.toBe(null);
            done();
        });
    });

    it('should return null for bad ids', function(done) {
        // Accounts should be empty...
        Account.findById('51bb793aca2ab77a3200000d', function(err, result) {
            expect(result).toBe(null);
            done();
        });
    });

    it('can lookup users by email', function(done) {
        var testAccount = new Account(testFixture);
        testAccount.save(function() {
            Account.findByEmail(testAccount.email, function(err, result) {
                expect(result).not.toBe(null);
                expect(result.email).toBe(testAccount.email);
                done();
            });
        });
    });

    it('can lookup users by id', function(done) {
        var testAccount = new Account(testFixture);
        testAccount.save(function() {
            Account.findById('' + testAccount._id, function(err, result) {
                expect(result).not.toBe(null);
                expect(result.email).toBe(testAccount.email);
                done();
            });
        });
    });

});
