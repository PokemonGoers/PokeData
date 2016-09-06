(function () {
    "use strict";

    module.exports = {
        start: function (callback) {
            console.log('Application started successfully');

            // set the database
            database.connect(function(db){
                /*The DB connection is open*/
                db.on('open', function () {
                    console.log('Database connection open.');
                    callback(1);
                });
            });
        },
        stop: function (done) {
            console.log('Application stopped');
        }
    };
}());
