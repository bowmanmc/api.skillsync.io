'use strict';
/**
 * resetPassword
 *
 */
var moment = require('moment');

var utils = require('../../../utils');


module.exports = function(password) {

    var tokenLength = 8;
    var token = utils.generateToken(tokenLength);

    // reset password to token
    password.token = token;

    // set expiration date
    var expireOn = moment().add(4, 'hours').toDate();
    password.expirationDate = expireOn;

    // set status
    password.status = 'RESET';

};
