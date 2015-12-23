'use strict';

var models = require('../../../../src/modules/account/models');


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
