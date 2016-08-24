"use strict";

/*Expose Database functions that can be used by other files */
module.exports = {

    connect: function (callback) {
        /*Create the DB connection string*/
        let databaseParams,
            dbConnection = "mongodb://";

        const config = require(__base + 'config'),
            mongoose = require('mongoose');

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