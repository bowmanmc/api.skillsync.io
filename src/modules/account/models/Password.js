'use strict';

var   bcrypt = require('bcrypt');
var   moment = require('moment');
var mongoose = require('mongoose');


/**
 * Password
 * Stores user passwords. This object should be used for authentication only
 * and never exposed through the web api.
 *
 * password hashing is done with the schema.pre('save'... bit below. It ensures
 * we never store the users actual password, just a hash of it.

 * token and expirationDate fields are used for forgotten passwords. We don't
 * update the password field in case the acutal user didn't request a password
 * change.
 */
var schema = new mongoose.Schema({
    accountId: {
        type: mongoose.Schema.Types.ObjectId,
        index: true
    },

    password: String,

    token: String,

    expirationDate: {
        type: Date,
        default: null
    },

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

schema.pre('save', function(next) {

    // only hash the password if it has been modified (or is new)
    if (this.isModified('password')) {
        var phash = bcrypt.hashSync(this.password, 10);
        this.password = phash;
    }

    // only hash the token if it has been modified (or is new)
    if (this.isModified('token')) {
        var thash = bcrypt.hashSync(this.token, 10);
        this.token = thash;
    }

    next();
});

// instance methods
schema.methods.isExpired = function() {
    if (this.expirationDate) {
        // not null... see if right now is after
        //var fmt = 'YYYY/MM/DD:HH:mm:ss';
        //console.log('Checking ' + expire.format(fmt) +
        //            ' isBefore ' + moment().format(fmt));
        var result = moment(this.expirationDate).isBefore(moment());
        return result;
    }
    return false;
};

schema.methods.checkToken = function(candidate) {
    if (this.isExpired()) {
        return false;
    }

    var result = false;
    if (this.token) {
        result = bcrypt.compareSync(candidate, this.token);
    }

    return result;
};

// static class methods
schema.statics.findByAccountId = function(accountId, callback) {
    this.findOne({accountId: accountId}, callback);
};

schema.statics.checkPassword = function(accountId, candidate, callback) {
    this.findByAccountId(accountId, function(err, pw) {
        var result = false;
        if (pw !== null) {
            result = bcrypt.compareSync(candidate, pw.password);
        }
        callback(null, result);
    });
};


module.exports = mongoose.model('Password', schema);
