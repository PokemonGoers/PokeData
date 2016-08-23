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
    'rarePokemon'
];

// when the choices of collection to be filled doesn't match, then exit the process
if (possibleRefillings.indexOf(collection) < 0) {
    process.exit();
}

/*
 * start
 */
logger.info('Refilling collection: ' + collection);

var config = require('../config'),
    mongoose = require('mongoose');


//Create the DB connection string
var databaseParams;
var dbConnection = "mongodb://";

/*Check whether local database is to be used. Else, use shared database.*/
if (appConfig['IS_LOCAL_DB']) {
    databaseParams = config['database'];
    if (databaseParams.username.length > 0 && databaseParams.password.length > 0) {
        dbConnection += databaseParams.username + ":" + databaseParams.password + "@";
    }
    dbConnection += databaseParams.uri + ":" + databaseParams.port + "/" + databaseParams.collection;
} else {
    databaseParams = config['shared_database'];
    /*Connection parameters for a shared database instance*/
    dbConnection += databaseParams.username + ":" + databaseParams.password + "@" + databaseParams.uri + "/" +
        databaseParams.collection;

}

//Create the connection to mongodb
logger.info('Going to connect to ' + dbConnection);

mongoose.connect(dbConnection);
var db = mongoose.connection;

// CONNECTION EVENTS: When successfully connected
db.on('connected', function () {
    logger.info('Mongoose connected');
});

// If the connection throws an error
db.on('error', function (err) {
    logger.error('Mongoose default connection error: ' + err);
    process.exit();
});

// When the connection is disconnected
db.on('disconnected', function () {
    logger.info('Mongoose default connection disconnected');
    process.exit();
});

// When the connection is open
db.on('open', function () {
    var updateFiller = require(__base + 'app/controllers/filler/' + collection);
    updateFiller.insertToDb(function () {
        process.exit();
    });
});