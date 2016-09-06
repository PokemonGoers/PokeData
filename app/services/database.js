"use strict";

/*Expose Database functions that can be used by other files */
module.exports = {

    /*
     *  Connect to the MongoDB
     */
    connect: function (callback) {
        /*Create the DB connection string*/
        let databaseParams,
            dbConnection = "mongodb://";

        const config = require(__base + 'config'),
            mongoose = require('mongoose');

        //Check whether local database parameters is to be used. Else, use shared database parameters.
        databaseParams = appConfig['IS_LOCAL_DB'] ? config['database'] : config['shared_database'];

        // check whether there is username and password for database connection
        if (databaseParams.username != undefined && databaseParams.password != undefined) {
            dbConnection += databaseParams.username + ":" + databaseParams.password + "@";
        }

        //Connection parameters for a local database instance
        if (appConfig['IS_LOCAL_DB'])
            dbConnection += databaseParams.uri + ":" + databaseParams.port + "/" + databaseParams.collection;

        //Connection parameters for a shared database instance
        else
            dbConnection +=  databaseParams.uri + "/" + databaseParams.collection;

        /*Create the connection to mongodb*/
        logger.info('Going to connect to ' + dbConnection);

        mongoose.connect(dbConnection);
        const db = mongoose.connection;

        /*Use native promises*/
        mongoose.Promise = global.Promise;

        /*Successfully connected*/
        db.on('connected', function () {
            logger.info('Mongoose connected');
        });

        /*Error in connecting to DB*/
        db.on('error', function (err) {
            logger.error('Mongoose default connection error: ' + err);
            process.exit();
        });

        /*Connection is disconnected*/
        db.on('disconnected', function () {
            logger.info('Mongoose default connection disconnected');
            process.exit();
        });

        callback(db);
    }
};