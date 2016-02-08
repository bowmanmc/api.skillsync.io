'use strict';
/**
 * logout
 */
const models = require('../models');


module.exports = function(accountId, callback) {

    models.Session.remove({
        accountId: accountId
    }, callback);

};
