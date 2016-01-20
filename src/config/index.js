'use strict';

var env = process.env;

module.exports = {
    MONGO: env.MONGO_CONNECTION || 'mongodb://skillsync:skillsyncrocks@ds045511.mongolab.com:45511/skillsync-dev',
    PORT: parseInt(env.PORT, 3000) || 3000,
    JWT_SECRET: env.JWT_SECRET || 'development_jwt_key'
};
