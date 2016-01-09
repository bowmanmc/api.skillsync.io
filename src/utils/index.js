'use strict';
/**
 * Utilities used throughout the app
 */
var crypto = require('crypto');


module.exports = {

    generateToken: function(length) {
        return crypto.randomBytes(length * 2).toString('hex').slice(length * -1);
    },

    sendEmail: require('./email')

};
