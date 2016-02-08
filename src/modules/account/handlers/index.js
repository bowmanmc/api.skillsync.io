'use strict';
/**
 * Handlers for requests to /account/*
 * Operations:
 *      - authenticate - authenticate an email/password combo
 *      - register - create an account and password
 *      - registered - is email address available?
 *      - reset - reset a password (forgot password)
 *      - signout - sign out of account (invalidate jwt)
 *      - update - edit an account

 *      - verify - verify a newly created account
 *      - changepass - change password (send notice email)
 */


module.exports = {
    authenticate: require('./authenticate'),
    lookup: require('./lookup'),
    register: require('./register'),
    registered: require('./registered'),
    reset: require('./reset'),
    signout: require('./signout'),
    update: require('./update')
};
