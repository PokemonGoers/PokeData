"use strict";

require(__dirname + '/../' + 'constants');

const requested = process.env.npm_config_collection;
console.log(requested);
/*
 * choices of collection to be filled
 */
var possibleListeners = [
    'rarePokemon'
];

// when the choices of collection to be filled doesn't match, then exit the process
if (possibleListeners.indexOf(requested) < 0) {
    process.exit();
}

// listener for pokemons
const listener = require(__base + 'app/controllers/filler/' + requested);
listener.fill(function () {
    process.exit();
});