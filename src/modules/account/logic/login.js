'use strict';
/**
 * login
 */
const jwt = require('jsonwebtoken');
const moment = require('moment');

const config = require('../../../config');
const models = require('../models');



module.exports = function(account, callback) {
    // Invalidate any old sessions
    models.Session.remove({
        accountId: account._id
    }, function() {

        // create Session object and generate JWT Token
        var session = new models.Session({
            accountId: account._id,
            expirationDate: moment().add(90, 'days').toDate()
        });

        session.save(function() {
            var data = {
                id: session._id,
                accountId: account._id
            };
            var token = jwt.sign(data, config.JWT_SECRET);
            callback(null, token);
        });
    });
};
