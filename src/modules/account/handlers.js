'use strict';
/**
 * Handlers for requests to /account/*
 * Operations:
 *      - isregistered - is email address available?
 *      - register - create an account and password
 *      - verify - verify a newly created account
 *      - reset - reset a password (forgot password)
 *      - edit - edit an account
 *      - changepass - change password (send notice email)
 *      - login - sign into account (generate jwt)
 *      - logout - sign out of account (invalidate jwt)
 */
var  Account = require('../models/Account');
var Password = require('../models/Password');


module.exports = {
    
};
