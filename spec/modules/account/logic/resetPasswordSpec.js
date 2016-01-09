'use strict';
var    src = '../../../../src/modules/account';
var  logic = require(src + '/logic');
var models = require(src + '/models');


describe('account.logic.resetPassword', function() {

    it('should reset a password correctly', function() {
        var pass = 'password123';
        var password = new models.Password({
            password: pass
        });

        logic.resetPassword(password);

        expect(password.status).toBe('RESET');
        expect(password.token).not.toBeNull();
        expect(password.expirationDate).not.toBeNull();
        expect(password.isExpired()).toBe(false);
    });

});
