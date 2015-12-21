'use strict';

var Joi = require('joi');

var validators = require('../../../src/modules/account/validators');
var accountFixture = require('./accountFixture');


describe('Account Validators', function() {

    it('should validate valid accounts', function(done) {
        Joi.validate(accountFixture, validators.Account, validators.options, 
            function(err, result) {
                expect(err).toBeNull();
                expect(result).not.toBeNull();
                done();
            }
        );
    });

    it('should invalidate empty params', function(done) {
        var params = {};
        Joi.validate(params, validators.Account, validators.options, 
            function(err, result) {
                expect(err).not.toBeNull();
                expect(result).toEqual(params);

                // 2 required fields - name & email
                expect(err.details.length).toBe(2);

                done();
            }
        );
    });

    it('should invalidate invalid email param', function(done) {
        var params = {
            'name': 'Spec McTest',
            'email': 'foo' // invalid email
        };
        Joi.validate(params, validators.Account, validators.options,
            function(err, result) {
                expect(err).not.toBeNull();
                expect(result).toEqual(params);
                expect(err.details[0].path).toBe('email');
                done();
            }
        );
    });

});

describe('Email Validators', function() {
    var email = 'smctest@spec.org';
    it('should validate valid emails', function(done) {
        Joi.validate(email, validators.Email, validators.options, 
            function(err, result) {
                expect(err).toBeNull();
                expect(result).not.toBeNull();
                done();
            }
        );
    });
    
    it('should not validate null emails', function(done) {
        Joi.validate(null, validators.Email, validators.options,
            function(err, result) {
                expect(err).not.toBeNull();
                expect(err.details.length).toBe(1);
                expect(result).toBeNull();
                console.log('ERROR: ' + JSON.stringify(err));
                console.log('RESULT: ' + JSON.stringify(result));
                done();
            }
        );
    });
    
    it('should not validate empty emails', function(done) {
        var test = '      ';
        Joi.validate(test, validators.Email, validators.options,
            function(err, result) {
                expect(err).not.toBeNull();
                expect(err.details.length).toBe(1);
                expect(result).toEqual(test);
                done();
            }
        );
    });
    
    it('should not validate bogus emails', function(done) {
        var test = 'foobarbaz';
        Joi.validate(test, validators.Email, validators.options,
            function(err, result) {
                expect(err).not.toBeNull();
                expect(err.details.length).toBe(1);
                expect(result).toEqual(test);
                done();
            }
        );
    });
});

describe('Password Validators', function() {

    it('should validate valid params', function(done) {
        var params = {
            userId: 'foobarbaz',
            password: 'foobarbaz'
        };

        Joi.validate(params, validators.Password, validators.options, 
            function(err, result) {
                expect(err).toBeNull();
                expect(result).not.toBeNull();
                done();
            }
        );
    });
    
    it('should not validate empty parameters', function(done) {
        var params = {};
        Joi.validate(params, validators.Password, validators.options,
            function(err, result) {
                expect(err).not.toBeNull();
                expect(err.details.length).toBe(2);
                expect(result).toEqual(params);
                done();
            }
        );
    });

});