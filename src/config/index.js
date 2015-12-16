'use strict';

var env = process.env;

module.exports = {
    mongo: env.MONGO_CONNECTION || 'mongodb://skillsync:skillsyncrocks@ds045511.mongolab.com:45511/skillsync-dev',
    port: parseInt(env.PORT, 3000) || 3000
};
