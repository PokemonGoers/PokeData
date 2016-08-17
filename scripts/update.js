require(__dirname + '/../' + 'constants');

/*
 * collection that needs to be filled.
 */
var requested = process.env.npm_config_collection;
if(requested === undefined) {
    process.exit();
}
/*
 * choices of collection to be filled
 */
var possibleRefillings = [
    'pokemon'
];

// when the choices of collection to be filled doesn't match, then exit the process
if(possibleRefillings.indexOf(requested) < 0) {
    process.exit();
}

/*
 * start
 */
console.log('Refilling collection: '+ requested);

var config = require('../config/config'),
    mongoose = require('mongoose');


//Create the DB connection string
var databaseParams;
var dbConnection = "mongodb://";

/*Check whether local database is to be used. Else, use shared database.*/
if(appConfig['IS_LOCAL_DB']) {
    databaseParams = config['database'];
    if (databaseParams.username.length > 0 && databaseParams.password.length > 0) {
        dbConnection += databaseParams.username + ":" + databaseParams.password + "@";
    }
    dbConnection += databaseParams.uri + ":" + databaseParams.port + "/" + databaseParams.collection;
} else {
    databaseParams = config['shared_database'];
    /*Connection parameters for a shared database instance*/
    dbConnection += databaseParams.username + ":" + databaseParams.password+ "@" + databaseParams.uri + "/" +
        databaseParams.collection;

}

//Create the connection to mongodb
console.log("Going to connect to " + dbConnection);

mongoose.connect(dbConnection);
var db = mongoose.connection;

// CONNECTION EVENTS: When successfully connected
db.on('connected', function () {
    console.log('Mongoose connected');
});

// If the connection throws an error
db.on('error', function (err) {
    console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
db.on('disconnected', function () {
    console.log('Mongoose default connection disconnected');
});

// When the connection is open
db.on('open', function () {
    var updateFiller = require(__base +'app/controllers/filler/' + requested);
    updateFiller.fill(function() {process.exit();});
});