'use strict';

var mockgoose = require('mockgoose');
var mongoose = require('mongoose');

describe('Database', function() {

    it('can connect to mongo', function() {
        // NOTE: This should only be called once per session... You'll get some
        // errrors if you try to connect to the database twice while running
        // tests. Doing it here makes sure it only happens once (all of the
        // other tests assume a connection is open).

        // Local - mockgoose in memory database
        mockgoose(mongoose);
        mongoose.connect('');
        
        // MongoLabs - SkillSync dev database
        //mongoose.connect('mongodb://skillsync:skillsyncrocks@ds045511.mongolab.com:45511/skillsync-dev');

        expect(mongoose.connection.readyState).not.toBe(null);
    });

});

