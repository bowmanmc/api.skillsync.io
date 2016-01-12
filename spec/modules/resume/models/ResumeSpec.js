'use strict';

var Resume = require('../../../../src/modules/resume/models/Resume');
var testFixture = require('./resumeFixture');


describe('resume.models.Resume', function() {

    beforeEach(function() {
        // Make sure the collection is empty
        Resume.remove({}, function(err) {
            if (err) {
                console.log('Error dropping collection!', err);
            }
        });
    });

    afterEach(function() {
        // Clean up after ourselves
        Resume.remove({}, function(err) {
            if (err) {
                console.log('Error dropping collection!', err);
            }
        });
    });

    it('can create an Resume', function(done) {
        var testResume = new Resume(testFixture);
        testResume.save(function() {
            expect(testResume._id).not.toBe(null);
            expect(testResume.created).not.toBe(null);
            expect(testResume.updated).not.toBe(null);
            done();
        });
    });

    it('should return null for bad ids', function(done) {
        // Resumes should be empty...
        Resume.findById('51bb793aca2ab77a3200000d', function(err, result) {
            expect(result).toBe(null);
            done();
        });
    });

    it('can lookup resumes by user', function(done) {
        var account = '51bb793aca2ab77a3200000d';
        var testResume = new Resume(testFixture);
        testResume.accountId = account;
        testResume.save(function() {
            Resume.findByAccountId(account, function(err, result) {
                expect(result).not.toBe(null);
                expect(result.email).toBe(testResume.email);
                done();
            });
        });
    });

});
