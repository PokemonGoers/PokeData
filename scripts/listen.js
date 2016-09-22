"use strict";

require(__dirname + '/../' + 'constants');
const config = require(__base + 'config');

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
    'pokemap',
    'hashPokemonGo'
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