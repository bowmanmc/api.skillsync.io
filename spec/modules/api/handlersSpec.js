'use strict';

var routes = require('../../../src/modules/api/routes');

describe('API Routes', function() {
    
    it('has a hello route', function() {
        var helloRoutes = routes.filter(function(route) {
            return route.path === '/api/hello';
        });
        expect(helloRoutes.length).toBe(1);
    });
    
});
