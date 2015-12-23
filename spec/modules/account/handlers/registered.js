'use strict';

var Account = require('../../../../src/modules/account/Account');
var accountFixture = require('../accountFixture');
var handlers = require('../../../../src/modules/account/handlers');


describe('account.handlers.registered', function() {

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
        handlers.registered(request, function(response) {
            expect(response.registered).toBe(false);
            done();
        });
    });

    it('should return false for null emails', function(done) {
        var request = {
            params: {
                'email': null
            }
        };
        handlers.registered(request, function(response) {
            expect(response.registered).toBe(false);
            done();
        });
    });
    
    it('should return false for requests without email param', function(done) {
        handlers.registered({params: {}}, function(response) {
            expect(response.registered).toBe(false);
            done();
        });
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
            handlers.registered(request, function(response) {
                expect(response.registered).toBe(true);
                done();
            });
        });
    });
});
