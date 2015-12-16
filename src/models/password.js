'use strict';

var mongoose = require('mongoose');

/**
 * Password
 * Stores user passwords. This object should be used for authentication only
 * and never exposed through the web api.
 */
function Password() {

    var schema = new mongoose.Schema({
        userId: mongoose.Schema.ObjectId,
        password: String,
        status: {
            type: String,
            default: 'OK'
            // OK, EXPIRED, RESET
        },
        created: {
            type: Date, default: Date.now 
        },
        updated: {
            type: Date, default: Date.now 
        }
    });

    var model = mongoose.model('password', schema);
    return model;
}

module.exports = Password;
