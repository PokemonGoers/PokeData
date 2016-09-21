"use strict";

require(__dirname + '/../' + 'constants');

require(__testbase + 'startUp').start(function (success) {
    if (success === 1) {
        console.log('Start-up done!');
        process.exit();
    }
});