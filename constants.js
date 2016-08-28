global.appRoot = require('path').resolve(__dirname);

global.__base = appRoot + '/';
global.__appbase = appRoot + '/app/';
global.__tmpbase = appRoot + '/tmp/';

global.logger = require(__appbase + '/services/logger');
global.database = require(__appbase + '/services/database');

global.appConfig = {
    APP_ENV: process.env.NODE_ENV || 'development',
    IS_LOCAL_DB: (process.env.NODE_ENV !== 'production')
};

global.collection = process.env.npm_config_collection || 'rarePokemon';
global.scanType = process.env.npm_config_scanType || 'global';