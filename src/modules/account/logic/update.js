'use strict';
/**
 * update account
 * Only update the passed in parameters
 */
var moment = require('moment');


module.exports = function(account, updates) {

    // only allow certain properties to be updated
    const updatable = ['name', 'email'];

    // Loop through the attributes in updates and copy to account
    // ** Note there is no validation at this level...
    Object.keys(updates).forEach(function (key) {

        if (updatable.indexOf(key) >= 0) {
            account[key] = updates[key];
        }

    });

};
