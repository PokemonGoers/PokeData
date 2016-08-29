"use strict";

/*Log function*/
let log = function(type, message, description) {
    const env = appConfig['APP_ENV'];
    /*Print the message only if the environment is dev.*/
   // if (env === 'development') {
        console.log(type, message, description || "");
    //}
};

/*Expose Logger functions that can be used by other files */
module.exports = {

    success: function (message, description) {
        log('SUCCESS', message, description);
    },
    error: function (message, description) {
        log('ERROR', message, description);
    },
    info: function (message, description) {
        log('INFO', message, description);
    }
};

