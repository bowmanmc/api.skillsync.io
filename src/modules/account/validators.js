'use strict';

var Joi = require('joi');


module.exports = {

    Account: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().email().required()
    }),

    Email: Joi.string().email().required(),

    Password: Joi.object().keys({
        userId: Joi.string().required(),
        password: Joi.string().required()
    }),

    // Default validation options. Pass into Joi.validate()
    options: {
        abortEarly: false,  // validate all fields
        allowUnknown: true  // ignore extra passed in fields
    }
};
