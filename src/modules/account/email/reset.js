'use strict';
/**
 * reset
 *
 * Generate password reset email
 */
var ejs = require('ejs');
var fs = require('fs');
var path = require('path');

var template = path.join(__dirname, '/../../../templates/account/reset.ejs');


module.exports = function(account, token) {

    // Compile the template and return a string to be emailed
    var result = ejs.render(
        fs.readFileSync(template, 'utf-8'), {
            account: account,
            token: token
        }, {
            filename: template
        }
    );
    return result;
};
