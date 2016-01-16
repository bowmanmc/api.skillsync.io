'use strict';

var Joi = require('joi');


module.exports = {

    registered: {
        email: Joi.string().email().required()
    },

    register: {
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required()
    },

    update: {
        name: Joi.string(),
        email: Joi.string().email()
    }
};
