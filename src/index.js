'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const Hapi = require('hapi');

// Create a server with a host and port
const server = new Hapi.Server({
    connections: {
        routes: {
            cors: true
        }
    }
});

server.connection({ 
    port: 8000 
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
