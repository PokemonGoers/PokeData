global.appRoot = require('path').resolve(__dirname);

global.__base = appRoot + '/';
global.__appbase = appRoot + '/app/';
global.__tmpbase = appRoot + '/tmp/';

global.logger = require(__appbase + '/services/logger');

global.appConfig = {
    IS_LOCAL_DB: false,
    ENV_DEVELOPMENT: process.env.ENV_DEVELOPMENT || 'dev'
};