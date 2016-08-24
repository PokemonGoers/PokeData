"use strict";

require(__dirname + '/../' + 'constants');

logger.info(collection);
/*
 * choices of collection to be filled
 */
var possibleListeners = [
    'rarePokemon',
    'twitter'
];

// when the choices of collection to be filled doesn't match, then exit the process
if (possibleListeners.indexOf(collection) < 0) {
    process.exit();
}

// listener for pokemons
const listener = require(__base + 'app/controllers/filler/' + collection);
listener.fill(function () {
    process.exit();
});