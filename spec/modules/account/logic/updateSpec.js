'use strict';
var    src = '../../../../src/modules/account';
var  logic = require(src + '/logic');
var models = require(src + '/models');

var accountFixture = require('../models/accountFixture');


describe('account.logic.update', function() {

    it('should only update passed in params', function() {

        var account = new models.Account(accountFixture);
        var updates = {
            name: 'Moe Howard'
        };

        logic.updateAccount(account, updates);

        expect(account.email).toBe(accountFixture.email);
        expect(account.name).not.toBe(accountFixture.name);
    });

    it('should not update unknown params', function() {

        var account = new models.Account(accountFixture);
        var updates = {
            name: 'Moe Howard',
            foo: 'nothing'
        };

        logic.updateAccount(account, updates);

        expect(account.name).not.toBe(accountFixture.name);
        expect(account.foo).toBeUndefined();
    });

});
