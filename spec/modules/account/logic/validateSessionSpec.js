'use strict';

var moment = require('moment');

var src = '../../../../src/modules/account';
var Session = require(src + '/models/Session');
var logic = require(src + '/logic');


describe('account.logic.validateSession', function() {

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
        logic.validateSession(null, null, function(err, result) {
            expect(result).toBe(false);
            done();
        });
    });

    it('should return false for invalid tokens', function(done) {
        logic.validateSession('foobarbaz', null, function(err, result) {
            expect(result).toBe(false);
            done();
        });
    });

    it('should return false for expired tokens', function(done) {
        var session = new Session({
            expirationDate: moment().subtract(1, 'day').toDate()
        });
        session.save(function() {
            var decoded = {
                id: session._id
            };
            logic.validateSession(decoded, null, function(err, result) {
                expect(result).toBe(false);
                done();
            });
        });
    });

    it('should return true for valid tokens', function(done) {
        var session = new Session({
            expires: moment().add(1, 'day').toDate()
        });
        session.save(function() {
            var decoded = {
                id: session._id
            };
            logic.validateSession(decoded, null, function(err, result) {
                expect(result).toBe(true);
                done();
            });
        });
    });
});
