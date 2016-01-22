'use strict';
var moment = require('moment');
var mongoose = require('mongoose');


/**
 * Account
 * Main user object we'll pass around. Stores a users basic information.
 */
var schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    },
    status: {
        type: String,
        default: 'NEW'
        // NEW, VERIFIED, EXPIRED
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    }
});

schema.pre('save', function(next) {

    // update the updated field
    this.updated = moment().toDate();

    next();
});

schema.statics.findByEmail = function(email, callback) {
    return this.findOne({ 'email': email }, callback);
};


// export the model
module.exports = mongoose.model('Account', schema);
