(function () {
    "use strict";
    var express = require('express');
    var twitter = require('./controller/twitter');

    module.exports = {
        start: function (done) {
            console.log('App started');
        },
        stop: function (done) {
            console.log('App stopped');
        }
    };
}());
