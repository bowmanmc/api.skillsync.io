'use strict';

var api = require('./modules/api/routes');
var account = require('./modules/account/routes');
var resume = require('./modules/resume/routes');

// Concatenate all of the module routes into a single
// array and export that for our routing
module.exports = [].concat.apply([], [api, account, resume]);
//console.log('SkillSync API Routes: ' + JSON.stringify(module.exports));
