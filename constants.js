global.appRoot = require('path').resolve(__dirname);

global.__base = appRoot + '/';
global.__appbase = appRoot + '/app/';
global.__tmpbase = appRoot + '/tmp/';

global.logger = require(__appbase + '/services/logger');

global.appConfig = {
    IS_LOCAL_DB: false,
    APP_ENV: process.env.NODE_ENV || 'development'
};

global.collection = process.env.npm_config_collection || 'rarePokemon';