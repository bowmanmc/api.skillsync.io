'use strict';

var moment = require('moment');
var mongoose = require('mongoose');


/**
 * Session
 */
var schema = new mongoose.Schema({
    accountId: {
        type: mongoose.Schema.Types.ObjectId,
        index: true
    },
    data: {
        type: mongoose.Schema.Types.Mixed
    },
    expirationDate: {
        type: Date,
        default: null
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
schema.statics.findByAccountId = function(accountId, callback) {
    this.findOne({accountId: accountId}, callback);
};


// export the model
module.exports = mongoose.model('Session', schema);
