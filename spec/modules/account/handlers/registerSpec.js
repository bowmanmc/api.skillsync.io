'use strict';

var src = '../../../../src/modules';
var handlers = require(src + '/account/handlers');
var models = require(src + '/account/models');
var Resume = require(src + '/resume/models/Resume');

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
        Resume.remove({}, function(err) {
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
        Resume.remove({}, function(err) {
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
