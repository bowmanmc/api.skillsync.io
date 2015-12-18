'use strict';

var Password = require('../../src/models/password');


describe('Password', function() {
    beforeEach(function() {
        // Make sure the collection is empty
        Password.remove({}, function(err) {
            if (err) {
                console.log('Error dropping collection!', err);
            }
        });
    });
    
    afterEach(function() {
        // Make sure the collection is empty
        Password.remove({}, function(err) {
            if (err) {
                console.log('Error dropping collection!', err);
            }
        });
    });
    
    it('should hash passwords on save', function(done) {
        var plain = 'password123';
        var pw = new Password({
            password: plain
        });
        pw.save(function() {
            console.log('pw: ' + pw.password);
            expect(pw.password).not.toBe(plain);
            done();
        });
    });
});
