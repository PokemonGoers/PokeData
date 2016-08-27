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
        // builder basic pokemon details
        const builder = require(__base + 'app/controllers/filler/' + collection);
        builder.insertToDb(function () {
            process.exit();
        });

    })
});
