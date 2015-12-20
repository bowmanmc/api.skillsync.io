'use strict';
/**
 * Handlers for requests to /account/*
 * Operations:
 *      - isRegistered - is email address available?
 *      - register - create an account and password
 *      - verify - verify a newly created account
 *      - reset - reset a password (forgot password)
 *      - edit - edit an account
 *      - changepass - change password (send notice email)
 *      - login - sign into account (generate jwt)
 *      - logout - sign out of account (invalidate jwt)
 */


module.exports = {

    isRegistered: require('./isRegistered'),
    register: require('./register')

};
