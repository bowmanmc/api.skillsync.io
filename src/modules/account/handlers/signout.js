'use strict';
/**
 * signout
 */
var logic = require('../logic');


module.exports = function(request, reply) {

    var args = request.payload;
    var accountId = args.account;

    logic.logout(accountId, function() {
        reply({
            success: true
        });
    });

};
