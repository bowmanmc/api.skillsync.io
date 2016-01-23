'use strict';
/**
 * update resume
 * Only update the passed in parameters
 */

module.exports = function(account, updates) {

    // only allow certain properties to be updated
    const updatable = [
        'years', 'location', 'summary',
        'work', 'education', 'skills'
    ];

    // Loop through the attributes in updates and copy to account
    // ** Note there is no validation at this level...
    var keys = Object.keys(updates);
    updatable.forEach(function(key) {
        if (keys.indexOf(key) > -1) {
            account[key] = updates[key];
        }
    });

};
