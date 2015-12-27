'use strict';
var   moment = require('moment');
var mongoose = require('mongoose');
var Password = require('../../../../src/modules/account/models/Password');


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

    it('should not expire regular passwords', function(done) {
        var pw = new Password(testFixture);
        pw.save(function() {
            expect(pw.isExpired()).toBe(false);
            done();
        });
    });

    it('should expire passwords with expirationDates set', function(done) {
        // No Expiration
        var pw = new Password(testFixture);
        expect(pw.isExpired()).toBe(false);

        // Expired
        pw = new Password(testFixture);
        var yesterday = moment().subtract(1, 'day');
        pw.expirationDate = yesterday.toDate();
        expect(pw.isExpired()).toBe(true);

        // Not Expired Yet
        pw = new Password(testFixture);
        var tomorrow = moment().add(1, 'day');
        pw.expirationDate = tomorrow.toDate();
        expect(pw.isExpired()).toBe(false);

        done();
    });

});
