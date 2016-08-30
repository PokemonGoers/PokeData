(function () {
    "use strict";
    let express = require('express'),
        bodyParser = require('body-parser'),
        cors = require('cors'),
        config = require('./config');


    module.exports = {
        start: function (done) {
            logger.success('Application started successfully');

            // set the database
            database.connect(function(db){
                /*The DB connection is open*/
                db.on('open', function () {
                    /*Perform operations that require DB connection*/
                });
            });

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
                } else if(req.method == 'POST') {
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

            app.use('/doc', express.static('apidoc'));

            //listening for requests
            var port = config.server.port || 8080; //a default port if the config file does not contain it
            app.listen(port);
            logger.info('Listening on port ' + port);

        },
        stop: function (done) {
            logger.info('Application stopped');
        }
    };
}());
