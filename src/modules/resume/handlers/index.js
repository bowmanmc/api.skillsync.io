'use strict';
/**
 * Handlers for requests to /resume/*
 * Operations:
 *      - create - create a resume
 *      - update - edit a resume
 */


module.exports = {
    lookup: require('./lookup'),
    create: require('./create'),
    update: require('./update')
};
