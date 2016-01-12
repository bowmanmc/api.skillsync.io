'use strict';

var moment = require('moment');


module.exports = {
    'accountId': '1234',
    'summary': 'I want to be a good test',
    'work': [{
        'name': 'SkillSync',
        'url': 'http://skillsync.io',
        'startDate': moment().subtract(10, 'years').toDate(),
        'endDate': moment().subtract(5, 'years').toDate()
    }],
    'education': []
};
