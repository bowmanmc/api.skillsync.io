'use strict';

var mongoose = require('mongoose');
var mockgoose = require('mockgoose');


module.exports = {
    
    connect2mongo: function() {
        mockgoose(mongoose);
        mongoose.connect('');
        //mongoose.connect('mongodb://skillsync:skillsyncrocks@ds045511.mongolab.com:45511/skillsync-dev');
    }
    
};

