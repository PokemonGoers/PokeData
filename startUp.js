(function () {
    "use strict";
    var express = require('express');
   

    module.exports = {
        start: function (done) {
            console.log('App started');
        },
        stop: function (done) {
            console.log('App stopped');
        }
    };
}());
