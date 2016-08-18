(function () {
    "use strict";
    let express = require('express');
    let twitterStreaming = require('./controller/twitter');
    let loadBasicPokemonDetails = require('./controller/loadBasicPokemonDetails');

    module.exports = {
        start: function (done) {
            console.log('App started');

            //load basic pokemon details
            loadBasicPokemonDetails.start();

            //twitter streaming
            //twitterStreaming.startStreaming();       
        },
        stop: function (done) {
            console.log('App stopped');
        }
    };
}());
