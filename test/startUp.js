(function () {
    "use strict";

    module.exports = {
        start: function (callback) {
            logger.success('Application started successfully');

            // set the database
            database.connect(function(db){
                /*The DB connection is open*/
                db.on('open', function () {
                    logger.success('Database connection open.');
                    callback(1);
                });
            });
        },
        stop: function (done) {
            logger.info('Application stopped');
        }
    };
}());
