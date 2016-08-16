(function () {
    "use strict";
    let express = require('express');
    let mongoose = require ('mongoose');
    let config = require('./config/config');
    let mongodbConnection = "mongodb://";

    let twitterStreaming = require('./controller/twitter');
    let loadBasicPokemonDetails = require('./controller/loadBasicPokemonDetails');

    //get database String
    function getDbString(database) { 
        return mongodbConnection + database.uri + ":" + database.port + "/" + database.collection;
    }

    function setupDataBase() {
        console.log("Connecting to " + getDbString(config.database));
        mongoose.connect(getDbString(config.database));
        let db = mongoose.connection;

        // MongoDB events
        db.on('connected', function () { 
            console.log('Mongoose connected');
        });
        db.on('error', function (err) {
            console.log('Mongoose default connection error: ' + err);
        });
        db.on('disconnected', function () {
            console.log('Mongoose default connection disconnected');
        });
        db.on('open', function () {
            console.log("Mongoose connection open");
        });
    }
    
    module.exports = {
        start: function (done) {
            console.log('App started');

            setupDataBase();   

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
