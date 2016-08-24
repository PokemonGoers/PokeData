"use strict";
module.exports = {
    /*
     *  required for http request to get JSON data and storing it into a file.
     */
    getHttpRequestData : function(url){
        let request = require('request'),
            fs = require('fs'),
            all = [];

        request(url, function (error, response, body) {

            if (!error && response.statusCode === 200) {
                const data = JSON.parse(body),
                      srcName = collection,
                      fileName = (__tmpbase+srcName+"/"+srcName+"_"+parseInt(Math.floor(Date.now() / 1000))+".json").toString();

                fs.appendFile(fileName, JSON.stringify(data.results), function(err) {
                    if(err) {
                        return console.log(err);
                    }
                    logger.info("The file was saved!");
                });
            }
        });
    },

    /*
     *  required for connecting to the MongoDB
     */
    getDbConnection: function (callback) {
        //Create the DB connection string
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

        //Create the connection to mongodb
        logger.info('Going to connect to ' + dbConnection);

        mongoose.connect(dbConnection);
        const db = mongoose.connection;

        // Use native promises
        mongoose.Promise = global.Promise;

        // When successfully connected
        db.on('connected', function () {
            logger.info('Mongoose connected');
        });

        // Error in connecting to db
        db.on('error', function (err) {
            logger.error('Mongoose default connection error: ' + err);
            process.exit();
        });

        // When the connection is disconnected
        db.on('disconnected', function () {
            logger.info('Mongoose default connection disconnected');
            process.exit();
        });

        callback(db);
    }
};