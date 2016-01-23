'use strict';

var Joi = require('joi');


module.exports = {

    create: {
        accountId: Joi.string().required()
    }
};
