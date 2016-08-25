"use strict";

require(__dirname + '/../' + 'constants');

if (collection === undefined) {
    process.exit();
}
logger.info(collection);
/*
 * choices of collection to be filled
 */
var possibleListeners = [
    'basicPokemonDetail'
];

// when the choices of collection to be filled doesn't match, then exit the process
if (possibleListeners.indexOf(collection) < 0) {
    process.exit();
}

database.connect(function (db) {
    db.on('open', function () {
        // listener for pokemons
        const listener = require(__base + 'app/controllers/filler/' + collection);
        listener.fill(function () {
            process.exit();
        });

    })
});
