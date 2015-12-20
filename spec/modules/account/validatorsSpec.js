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
                //console.log('ERROR: ' + JSON.stringify(err));
                //console.log('RESULT: ' + JSON.stringify(result));
                done();
            }
        );
    });

});
