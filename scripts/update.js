require(__dirname + '/../' + 'constants');

/*
 * collection that needs to be filled.
 */
if (collection === undefined) {
    process.exit();
}
/*
 * choices of collection to be filled
 */
var possibleRefillings = [
    'pokemon',
    'rarePokemon',
    'pokeRadar'
];

// when the choices of collection to be filled doesn't match, then exit the process
if (possibleRefillings.indexOf(collection) < 0) {
    process.exit();
}

/*
 * start
 */
logger.info('Refilling collection: ' + collection);


database.connect(function (db) {
    /*The DB connection is open*/
    db.on('open', function () {
        var updateFiller = require(__base + 'app/controllers/filler/' + collection);
        updateFiller.insertToDb(function () {
            process.exit();
        });
    });
});