'use strict';

var moment = require('moment');


module.exports = {
    'accountId': '51bb793aca2ab77a3200000d',
    'summary': 'I want to be a good test',
    'years': 12,
    'work': [{
        'name': 'SkillSync',
        'url': 'http://skillsync.io',
        'startDate': moment([2012, 1, 10]).toDate(),
        'endDate': moment([2013, 1, 10]).toDate()
    }],
    'education': [{
        'institution': 'School of Hard Knocks',
        'url': 'http://foo.bar.com',
        'startDate': moment([2013, 1, 10]).toDate(),
        'endDate': null,
        'crediential': 'BS in Unit Testing'
    }]
};
