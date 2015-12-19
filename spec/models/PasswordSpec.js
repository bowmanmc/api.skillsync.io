'use strict';

var mongoose = require('mongoose');
var Password = require('../../src/models/password');


describe('Password', function() {

    var testFixture = {
        userId: mongoose.Types.ObjectId(),
        password: 'password123'
    };

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
        var pw = new Password(testFixture);
        pw.save(function() {
            expect(pw.password).not.toBe(testFixture.password);
            done();
        });
    });
    
    it('should lookup passwords by user', function(done) {
        var pw = new Password(testFixture);
        pw.save(function() {
            // password is hashed
            expect(pw.password).not.toBe(testFixture.password);
            // lookup by userId and make sure they match
            Password.findByUserId(testFixture.userId, function(err, result) {
                expect(result.password).toBe(pw.password);
                done();
            });
        });
    });
    
    it('should authenticate valid passwords', function(done) {
        var pw = new Password(testFixture);
        pw.save(function() {
            Password.authenticate(
                testFixture.userId,
                testFixture.password,
                function(result) {
                    expect(result).toBe(true);
                    done();
                }
            );
        });
    });
    
    it('should fail bad passwords', function(done) {
        var pw = new Password(testFixture);
        pw.save(function() {
            Password.authenticate(
                testFixture.userId,
                'foobarbaz',
                function(result) {
                    expect(result).toBe(false);
                    done();
                }
            );
        });
    });

});
