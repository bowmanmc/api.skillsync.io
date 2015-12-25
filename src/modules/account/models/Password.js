'use strict';

var   bcrypt = require('bcrypt');
var   moment = require('moment');
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
    var pw = this;

    // only hash the password if it has been modified (or is new)
    if (!pw.isModified('password')){
        return next();
    }

    var hash = bcrypt.hashSync(pw.password, 10);
    pw.password = hash;
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

// static class methods
schema.statics.findByUserId = function(userId, callback) {
    this.findOne({userId: userId}, function(err, pw) {
        callback(err, pw);
    });
};

schema.statics.authenticate = function(userId, candidate, callback) {
    this.findByUserId(userId, function(err, pw) {
        var result = false;
        if (pw !== null) {
            result = bcrypt.compareSync(candidate, pw.password);
        }
        callback(result);
    });
};

module.exports = mongoose.model('Password', schema);
