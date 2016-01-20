'use strict';

const mongoose = require('mongoose');
const Hapi = require('hapi');
const jwt2 = require('hapi-auth-jwt2');

const config = require('./config');
const validator = require('./modules/session/validator');


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

// Register plugins
//     - hapi-auth-jwt2
server.register([{ register: jwt2 }], function(err) {
    if (err) {
        console.log('Error registering hapi-auth-jwt2!!!', err);
    }

    if (!process.env.JWT_SECRET) {
        console.log('!!!! JWT_SECRET Environment Variable Not Set !!!!');
        process.env.JWT_SECRET = 'development_jwt_key';
    }

    // Setup authentication strategy
    server.auth.strategy('jwt', 'jwt', {
        key: process.env.JWT_SECRET,
        validateFunc: validator,
        verifyOptions: {
            algorithms: ['HS256']
        }
    });

    server.auth.default('jwt');

    // Add the routes
    var routes = require('./routes');
    server.route(routes);
});

// Start the server
server.start((err) => {
    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});
