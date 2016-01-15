'use strict';

var mongoose = require('mongoose');

/**
 * Resume
 * A candidate's resume.
 */
var schema = new mongoose.Schema({
    accountId: {
        type: mongoose.Schema.Types.ObjectId,
        index: true
    },
    years: {
        type: Number,
        index: true
    },
    location: {
        type: String,
        index: true
    },
    summary: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    },
    work: [new mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        url: {
            type: String
        },
        startDate: {
            type: Date,
            required: true
        },
        endDate: {
            type: Date,
            default: null
        },
        skillsUsed: {
            type: Array,
            default: []
        }
    })],
    education: [new mongoose.Schema({
        institution: {
            type: String,
            required: true
        },
        url: {
            type: String
        },
        startDate: {
            type: Date,
            required: true
        },
        endDate: {
            type: Date,
            default: null
        },
        credential: {
            type: String
        }
    })],
    skills: {
        type: Array,
        default: []
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

schema.statics.findByAccountId = function(accountId, callback) {
    return this.findOne({ accountId: accountId }, callback);
};

// export the model
module.exports = mongoose.model('Resume', schema);
