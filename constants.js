global.appRoot = require('path').resolve(__dirname);

global.__base = appRoot + '/';
global.__appbase = appRoot + '/app/';
global.__tmpbase = appRoot + '/tmp/';

global.appConfig = {
    IS_LOCAL_DB: false
};