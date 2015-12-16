'use strict';

var mongoose = require('mongoose');

/**
 * Account
 * Main user object we'll pass around. Stores a users basic information.
 */
function Account() {

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
            type: Date, default: Date.now 
        },
        updated: {
            type: Date, default: Date.now 
        }
    });

    var model = mongoose.model('account', schema);
    return model;
}

module.exports = Account;
