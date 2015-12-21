'use strict';

var validators = require('../../../src/modules/account/validators');
var accountFixture = require('./accountFixture');


describe('Account Validators', function() {

    it('should validate valid accounts', function(done) {
        validators.checkAccount(accountFixture, function(errors) {
            expect(errors).toBeNull();
            done();
        });
    });

    it('should invalidate empty params', function(done) {
        var params = {};
        validators.checkAccount(params, function(errors) {
            expect(errors).not.toBeNull();
            // 2 required fields - name & email
            expect(errors.details.length).toBe(2);
            done();
        });
    });

    it('should invalidate invalid email param', function(done) {
        var params = {
            'name': 'Spec McTest',
            'email': 'foo' // invalid email
        };
        validators.checkAccount(params, function(errors) {
            expect(errors).not.toBeNull();
            expect(errors.details[0].path).toBe('email');
            done();
        });
    });

});

describe('Email Validators', function() {
    it('should validate valid emails', function(done) {
        validators.checkEmail('smctest@spec.org', function(errors) {
            expect(errors).toBeNull();
            done();
        });
    });
    
    it('should not validate null emails', function(done) {
        validators.checkEmail(null, function(errors) {
            expect(errors).not.toBeNull();
            expect(errors.details.length).toBe(1);
            done();
        });
    });
    
    it('should not validate empty emails', function(done) {
        var test = '      ';
        validators.checkEmail(test, function(errors) {
            expect(errors).not.toBeNull();
            expect(errors.details.length).toBe(1);
            done();
        });
    });
    
    it('should not validate bogus emails', function(done) {
        var test = 'foobarbaz';
        validators.checkEmail(test, function(errors) {
            expect(errors).not.toBeNull();
            expect(errors.details.length).toBe(1);
            done();
        });
    });

});

describe('Password Validators', function() {

    it('should validate valid params', function(done) {
        var params = {
            userId: 'foobarbaz',
            password: 'foobarbaz'
        };
        validators.checkPassword(params, function(errors) {
            expect(errors).toBeNull();
            done();
        });
    });
    
    it('should not validate empty parameters', function(done) {
        validators.checkPassword({}, function(errors) {
            expect(errors).not.toBeNull();
            expect(errors.details.length).toBe(2);
            done();
        });
    });

});