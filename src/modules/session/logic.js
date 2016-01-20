'use strict';
const jwt = require('jsonwebtoken');
const moment = require('moment');

const config = require('../../config');
const Session = require('./models/Session');


module.exports = {

    login: function(account, callback) {
        // create Session object and generate JWT Token
        var session = new Session({
            accountId: account._id,
            expirationDate: moment().add(90, 'days').toDate()
        });
        session.save(function() {
            var token = jwt.sign({
                id: session._id
            }, config.JWT_SECRET);
            callback(null, token);
        });
    }

};
