'use strict';

var  Account = require('../../../../src/modules/account/Account');
var Password = require('../../../../src/modules/account/Password');


describe('account.handlers.register', function() {

    beforeEach(function() {
        // Make sure the collection is empty
        Account.remove({}, function(err) {
            if (err) {
                console.log('Error dropping collection!', err);
            }
        });
        Password.remove({}, function(err) {
            if (err) {
                console.log('Error dropping collection!', err);
            }
        });
    });

    afterEach(function() {
        // Clean up after ourselves
        Account.remove({}, function(err) {
            if (err) {
                console.log('Error dropping collection!', err);
            }
        });
        Password.remove({}, function(err) {
            if (err) {
                console.log('Error dropping collection!', err);
            }
        });
    });
    
    it('should check for empty parameters', function(done) {
        var request = {
            params: {}
        };
        done();
        // handlers.register.(request, function(response) {
        //     console.log('response: ' + JSON.stringify(response));
        //     done();
        // });
    });
});
