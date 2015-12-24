'use strict';

var src = '../../../../src/modules/account';
var handlers = require(src + '/handlers');
var models = require(src + '/models');

var accountFixture = require('../models/accountFixture');


describe('account.handlers.register', function() {

    beforeEach(function() {
        // Make sure the collection is empty
        models.Account.remove({}, function(err) {
            if (err) {
                console.log('Error dropping collection!', err);
            }
        });
        models.Password.remove({}, function(err) {
            if (err) {
                console.log('Error dropping collection!', err);
            }
        });
    });

    afterEach(function() {
        // Clean up after ourselves
        models.Account.remove({}, function(err) {
            if (err) {
                console.log('Error dropping collection!', err);
            }
        });
        models.Password.remove({}, function(err) {
            if (err) {
                console.log('Error dropping collection!', err);
            }
        });
    });

    it('should register new accounts', function(done) {
        var request = {
            payload: accountFixture
        };
        handlers.register(request, function(response) {
            expect(response.accountId).not.toBeNull();
            done();
        });
    });
});
