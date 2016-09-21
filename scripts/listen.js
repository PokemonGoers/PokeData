"use strict";

require(__dirname + '/../' + 'constants');
const config = require(__base + 'config');
const hashPokemonGo = require('hashpokemongo');
const Twitter = require("twitter");


logger.info(collection);
/*
 * choices of collection to be filled
 */
var possibleListeners = [
    'rarePokemon',
    'pokeRadar',
    'twitter',
    'skiplagged',
    'pokecrew',
    'fastpokemap',
    'pokezz',
    'pokedexs',
    'pokemap'
];

// when the choices of collection to be filled doesn't match, then exit the process
if (possibleListeners.indexOf(collection) < 0) {
    process.exit();
}

database.connect(function (db) {
    /*The DB connection is open*/
    db.on('open', function () {
        // listener for pokemons
        const listener = require(__base + 'app/controllers/filler/' + config.sourceToFiller[collection]);
        listener.insertToDb(function () {
            return;
        });
    });
});


const twitterOptions = {
    consumer_key: config.twitter.consumer_key,
    consumer_secret: config.twitter.consumer_key,
    access_token_key: config.twitter.token,
    access_token_secret: config.twitter.token_secret
};

var twitterClient = new Twitter(twitterOptions);
// start scanning twitter for tweets about certain pokemons to compute sentiment analysis
hashPokemonGo.TwitterSentimentsMiner.start(twitterClient, config.shared_database.uri, 1 * 60 * 1000); // Mine every minute, so it takes about 2,5 hours to mine all pokemons