'use strict';

var Joi = require('joi');

var validators = require('../../../src/modules/account/validators');
var accountFixture = require('./models/accountFixture');
var validationOptions = {
    abortEarly: false,  // validate all fields
    allowUnknown: true  // ignore extra passed in fields
};

describe('account.validators.register', function() {

    it('should validate valid parameters', function(done) {
        Joi.validate(accountFixture, validators.register,
            function(errors) {
                expect(errors).toBeNull();
                done();
            }
        );
    });

    it('should invalidate empty params', function(done) {
        var params = {};
        Joi.validate(params, validators.register, validationOptions,
            function(errors) {
                expect(errors).not.toBeNull();
                // 3 required fields - name, email, and password
                expect(errors.details.length).toBe(3);
                done();
            }
        );
    });

    it('should invalidate invalid email param', function(done) {
        var params = {
            'name': 'Spec McTest',
            'email': 'foo', // invalid email
            'password': '123'
        };
        Joi.validate(params, validators.register, validationOptions,
            function(errors) {
                expect(errors).not.toBeNull();
                expect(errors.details[0].path).toBe('email');
                done();
            }
        );
    });
});

describe('account.validators.registered', function() {

    it('should validate valid emails', function(done) {
        var params = {
            'email': 'smctest@spec.org'
        };
        Joi.validate(params, validators.registered, validationOptions,
            function(errors) {
                expect(errors).toBeNull();
                done();
            }
        );
    });

    it('should not validate null emails', function(done) {
        Joi.validate({}, validators.registered, validationOptions,
            function(errors) {
                expect(errors).not.toBeNull();
                expect(errors.details.length).toBe(1);
                done();
            }
        );
    });

    it('should not validate empty emails', function(done) {
        var params = {
            'email': '      '
        };
        Joi.validate(params, validators.registered, validationOptions,
            function(errors) {
                expect(errors).not.toBeNull();
                expect(errors.details.length).toBe(1);
                done();
            }
        );
    });

    it('should not validate bogus emails', function(done) {
        var params = {
            'email': 'foobarbaz'
        };
        Joi.validate(params, validators.registered, validationOptions,
            function(errors) {
                expect(errors).not.toBeNull();
                expect(errors.details.length).toBe(1);
                done();
            }
        );
    });
});

describe('account.validators.update', function() {

    it('should validate valid emails', function(done) {
        var params = {
            'email': 'smctest@spec.org'
        };
        Joi.validate(params, validators.update, validationOptions,
            function(errors) {
                expect(errors).toBeNull();
                done();
            }
        );
    });

    it('should not validate empty emails', function(done) {
        var params = {
            'email': '      '
        };
        Joi.validate(params, validators.update, validationOptions,
            function(errors) {
                expect(errors).not.toBeNull();
                expect(errors.details.length).toBe(1);
                done();
            }
        );
    });

    it('should not validate bogus emails', function(done) {
        var params = {
            'email': 'foobarbaz'
        };
        Joi.validate(params, validators.update, validationOptions,
            function(errors) {
                expect(errors).not.toBeNull();
                expect(errors.details.length).toBe(1);
                done();
            }
        );
    });
});
