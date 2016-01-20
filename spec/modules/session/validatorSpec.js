'use strict';

var moment = require('moment');

var src = '../../../src/modules/session';
var Session = require(src + '/models/Session');
var validator = require(src + '/validator');


describe('session.validator', function() {

    beforeEach(function() {
        // Make sure the collection is empty
        Session.remove({}, function(err) {
            if (err) {
                console.log('Error dropping collection!', err);
            }
        });
    });

    afterEach(function() {
        // Clean up after ourselves
        Session.remove({}, function(err) {
            if (err) {
                console.log('Error dropping collection!', err);
            }
        });
    });

    it('should return false for null tokens', function(done) {
        validator(null, null, function(err, result) {
            expect(result).toBe(false);
            done();
        });
    });

    it('should return false for invalid tokens', function(done) {
        validator('foobarbaz', null, function(err, result) {
            expect(result).toBe(false);
            done();
        });
    });

    it('should return false for expired tokens', function(done) {
        var session = new Session({
            expires: moment().subtract(1, 'day')
        });
        session.save(function() {
            var decoded = {
                id: session._id
            };
            validator(decoded, null, function(err, result) {
                expect(result).toBe(false);
                done();
            });
        });
    });

    it('should return true for valid tokens', function(done) {
        var session = new Session({
            expires: moment().add(1, 'day')
        });
        session.save(function() {
            var decoded = {
                id: session._id
            };
            validator(decoded, null, function(err, result) {
                expect(result).toBe(true);
                done();
            });
        });
    });
});
