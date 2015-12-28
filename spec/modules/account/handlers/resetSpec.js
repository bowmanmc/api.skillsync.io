'use strict';

var src = '../../../../src/modules/account';
var models = require(src + '/models');
var handlers = require(src + '/handlers');

var accountFixture = require('../models/accountFixture');


describe('account.handlers.reset', function() {

    beforeEach(function() {
        // Make sure the collection is empty
        models.Account.remove({}, function(err) {
            if (err) {
                console.log('Error dropping account collection!', err);
            }
        });
    });

    afterEach(function() {
        // Clean up after ourselves
        models.Account.remove({}, function(err) {
            if (err) {
                console.log('Error dropping account collection!', err);
            }
        });
    });


    it('should throw an error without an email', function(done) {
        var request = {
            payload: {
                email: 'foo@bar.com'
            }
        };
        handlers.reset(request, function(response) {
            expect(response.isBoom).toBe(true);
            done();
        });
    });
    // 
    // it('should reset a password', function(done) {
    //     var account = new models.Account(accountFixture);
    //     var password = new models.Password(accountFixture);
    //     account.save(function() {
    //         password.save(function() {
    //             var request = {
    //                 payload: {
    //                     email: account.email
    //                 }
    //             };
    //             handlers.reset(request, function(response) {
    //                 console.log('Response: ' + JSON.stringify(response));
    //                 expect(response.success).toBe(true);
    //                 done();
    //             });
    //         });
    //     });
    // });
});
