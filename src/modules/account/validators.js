'use strict';

var Joi = require('joi');


var AccountSchema = Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required()
});

var EmailSchema = Joi.string().email().required();

var PasswordSchema = Joi.object().keys({
    userId: Joi.string().required(),
    password: Joi.string().required()
});

// Default validation options. Pass into Joi.validate()
var validationOptions = {
    abortEarly: false,  // validate all fields
    allowUnknown: true  // ignore extra passed in fields
};

module.exports = {

    checkAccount: function(params, callback) {
        Joi.validate(params, AccountSchema, validationOptions, 
            function(err) {
                callback(err);
            }
        );
    },
    
    checkEmail: function(email, callback) {
        Joi.validate(email, EmailSchema, validationOptions,
            function(err) {
                callback(err);
            }
        );
    },
    
    checkPassword: function(params, callback) {
        Joi.validate(params, PasswordSchema, validationOptions,
            function(err) {
                callback(err);
            }
        );
    }

};
