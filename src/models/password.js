'use strict';

var mongoose = require('mongoose');

/**
 * Password
 * Stores user passwords. This object should be used for authentication only
 * and never exposed through the web api.
 */
var schema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        index: true
    },
    password: String,
    status: {
        type: String,
        default: 'OK'
        // OK, EXPIRED, RESET
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

module.exports = mongoose.model('Password', schema);
