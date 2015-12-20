'use strict';

var routes = require('../src/routes');

describe('Routes', function() {

    it('should merge child routes', function() {
        // Should have some api routes...
        var apiRoutes = routes.filter(function(route) {
            return route.path.indexOf('api') >= 0;
        });
        expect(apiRoutes.length > 0).toBe(true);
        // ... and some account routes
        var accountRoutes = routes.filter(function(route) {
            return route.path.indexOf('account') >= 0;
        });
        expect(accountRoutes.length > 0).toBe(true);
    });

});
