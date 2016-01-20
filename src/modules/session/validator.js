'use strict';
/**
 * Session validation function. This gets called with a decoded jwt token.
 * JWT Tokens are encoded server side before they are sent to the client and
 * will contain the session id.
 * When we get to this function, the token will have been decoded and should
 * contain the session id. We just need to lookup the session and make sure
 * it hasn't expired.
 */
var moment = require('moment');
var Session = require('./models/Session');


module.exports = function(decoded, request, callback) {
    if (!decoded || !decoded.id) {
        // The token is invalid
        return callback(null, false);
    }

    // Token is valid, lookup the session and make sure it hasn't expired
    Session.findById(decoded.id, function(err, result) {
        // If we found a user with the decoded.id, the token is valid... make
        // sure it hasn't expired
        var now = moment();
        var expired = moment(result.expires).isBefore(now);
        if (result && !expired) {
            return callback(null, true);
        }
        // else the token is messed up or it's expired
        return callback(null, false);
    });
};
