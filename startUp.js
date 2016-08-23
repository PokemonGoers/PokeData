(function () {
    "use strict";
    let express = require('express'),
        twitterStreaming = require('./app/controllers/twitter'),
        loadBasicPokemonDetails = require('./app/controllers/loadBasicPokemonDetails'),
        bodyParser = require('body-parser'),
        cors = require('cors'),
        config = require('./config'),
        mongoose = require('mongoose');

    /*
     *  required for connecting to the MongoDB
     */
    function setupDb() {

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
        logger.info('DB Connection', 'Going to connect to ' + dbConnection);
        mongoose.connect(dbConnection);
        var db = mongoose.connection;

        // CONNECTION EVENTS: When successfully connected
        db.on('connected', function () {
            logger.success('DB Connection Successful', 'Connected to Mongoose');
        });

        // If the connection throws an error
        db.on('error', function (err) {
            logger.error('Error in DB Connection', 'Mongoose default connection error: ' + err);
        });

        // When the connection is disconnected
        db.on('disconnected', function () {
            logger.info('DB Disconnected', 'Mongoose default connection disconnected');
        });

        db.on('open', function () {
            logger.info('Mongoose connection open');
        });
    }

    module.exports = {
        start: function (done) {
            logger.success('Application started successfully');

            // set the database
            setupDb();

            //Setup application
            var app = express();

            // Add parser to get the data from a POST
            app.use(bodyParser.urlencoded({extended: true}));
            app.use(bodyParser.json());

            //router setup
            var router = express.Router();

            // for every request
            router.use(function (req, res, next) {
                logger.info('Request incoming: ' + req.url);

                //Allow all GET requests as these do not modify data and we want users to be able to see that basic stuff
                if (req.method === 'GET') {
                    return next();
                }

            });

            //cors support for all routes
            app.use(cors({
                "origin": "*",
                "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
            }));

            //routes inclusion
            require(__base + 'routes')(app, router);

            // prefix for all routes
            app.use('/api', router);

            //listening for requests
            var port = config.server.port || 8080; //a default port if the config file does not contain it
            app.listen(port);
            logger.info('Listening on port ' + port);


            //load basic pokemon details
            loadBasicPokemonDetails.start();

            //twitter streaming
            twitterStreaming.startStreaming();
        },
        stop: function (done) {
            logger.info('Application stopped');
        }
    };
}());
