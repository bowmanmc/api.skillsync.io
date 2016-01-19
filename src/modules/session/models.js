'use strict';

var mongoose = require('mongoose');

/**
 * Session
 */
var schema = new mongoose.Schema({
    data: {
        type: mongoose.Schema.Types.Mixed
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

// export the model
module.exports = mongoose.model('Session', schema);
