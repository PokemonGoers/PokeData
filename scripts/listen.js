"use strict";

require(__dirname + '/../' + 'constants');

logger.info(collection);
/*
 * choices of collection to be filled
 */
var possibleListeners = [
    'rarePokemon',
    'pokeRadar'
];

// when the choices of collection to be filled doesn't match, then exit the process
if (possibleListeners.indexOf(collection) < 0) {
    process.exit();
}

database.connect(function (db) {
    /*The DB connection is open*/
    db.on('open', function () {
        // listener for pokemons
        const listener = require(__base + 'app/controllers/filler/' + collection);
        listener.insertToDb(function () {
            return;
        });
    });
});