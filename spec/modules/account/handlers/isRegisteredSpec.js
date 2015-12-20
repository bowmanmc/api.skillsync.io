'use strict';

/**
 * Test for modules/account/handlers.js #isRegistered
 */
var Account = require('../../../../src/modules/account/Account');
var accountFixture = require('../accountFixture');
var handlers = require('../../../../src/modules/account/handlers');


describe('Account Handler - isRegistered', function() {

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

    it('should return false for bogus emails', function(done) {
        var request = {
            params: {
                'email': 'modules.account.isRegisteredSpec@test.com'
            }
        };
        handlers.isRegistered(request, function(response) {
            expect(response.isRegistered).toBe(false);
            done();
        });
    });

    it('should return false for null emails', function(done) {
        var request = {
            params: {
                'email': null
            }
        };
        handlers.isRegistered(request, function(response) {
            expect(response.isRegistered).toBe(false);
            done();
        });
    });
    
    it('should return false for requests without email param', function(done) {
        handlers.isRegistered({}, function(response) {
            expect(response.isRegistered).toBe(false);
            done();
        })
    });

    it('should return true for registered emails', function(done) {
        // register a test user
        var testAccount = new Account(accountFixture);
        testAccount.save(function() {
            var request = {
                params: {
                    email: accountFixture.email
                }
            };
            handlers.isRegistered(request, function(response) {
                expect(response.isRegistered).toBe(true);
                done();
            });
        });
    });
});
