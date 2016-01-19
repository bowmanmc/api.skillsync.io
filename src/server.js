'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const mongoose = require('mongoose');
const config = require('./config');
const Hapi = require('hapi');

// connect to mongo
mongoose.connect(config.mongo);

// Create a server with a host and port
const server = new Hapi.Server({
    connections: {
        routes: {
            cors: true
        }
    }
});

// Setup authentication strategy
server.auth.strategy('jwt', 'jwt', {
    key: 'NeverShareYourSecret',
    validateFunc: validate,
    verifyOptions: {
        algorithms: ['HS256']
    }
});
server.auth.default('jwt');

// Connection information and defaults for validation behavior
server.connection({
    port: config.port,
    routes: {
        validate: {
            options: {
                abortEarly: false,
                stripUnknown: true
            }
        }
    }
});

// Add the routes
var routes = require('./routes');
server.route(routes);

// Start the server
server.start((err) => {
    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});
