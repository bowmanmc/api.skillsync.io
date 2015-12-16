'use strict';

var mongoose = require('mongoose');
var mockgoose = require('mockgoose');

var Account = require('../../src/models/account')();
// var config = require('../../src/config');

describe('Account', function() {

    beforeEach(function() {
        mockgoose(mongoose);
        mongoose.connect('');
        // mongoose.connect(config.mongo);
    });

    afterEach(function(done) {
        // drop collections
        mongoose.connection.db.listCollections().toArray(function(err, names) {
            if (err) {
                console.log(err);
                done();
            }
            else {
                names.forEach(function(c) {
                    mongoose.connection.db.dropCollection(c.name);
                    console.log('dropping collection: ' + c.name);
                });
                done();
            }
        });
    });

    it('can create an account', function(done) {
        var accountFixture = require('../fixtures/account.json');
        var testUser = new Account(accountFixture);

        testUser.save(function() {
            expect(testUser._id).not.toBe(null);
            expect(testUser.created).not.toBe(null);
            expect(testUser.updated).not.toBe(null);
            done();
        });
    });

});
