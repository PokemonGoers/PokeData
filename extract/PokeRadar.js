const http = require('https');
const fs = require('fs');
const q = require('q');
//var MongoClient = require('mongodb').MongoClient;
//var assert = require('assert');

// Connection URL
//var url = 'mongodb://<SERVER>';
// Use connect method to connect to the Server
//MongoClient.connect(url, function(err, db) {
//    assert.equal(null, err);
//    console.log("Connected correctly to server");
//
//    var collection = db.collection('documents');

const baseLink = function (lat, lng) {
    return {
        host: 'www.pokeradar.io',
        path: '/api/v1/submissions?minLatitude=' + lat.toString() + '&maxLatitude=' + (lat + 5).toString() + '&minLongitude=' + lng.toString() + '&maxLongitude=' + (lng + 10).toString()
    };
}

var all = [];
var promises = [];


for (var i = 0.1; i <= 85; i = i + 5) {
    for (var j = 1; j <= 170; j = j + 11) {
        var options = baseLink(i, j);

        var req = http.request(options, function (response) {
            var deferred = q.defer();
            promises.push(deferred.promise);

            var str = '';

            //another chunk of data has been recieved, so append it to `str`
            response.on('data', function (chunk) {
                str += chunk;
            });

            //the whole response has been recieved, so we just print it out here
            response.on('end', function () {
                try {
                    var data = JSON.parse(str);
                    all.push.apply(all, data.data);

                    if (data.data.length > 0) {
                        fs.writeFile((parseInt(Math.random() * 100)).toString() + ".js", JSON.stringify(data.data), function (err) {
                            if (err) {
                                return console.log(err);
                            }

                            console.log("The file was saved!");
                        });
                    }
                    // Insert some documents
                    // console.log('Inserting', data.data);
                    //                        collection.insertMany(data.data, function(err, result) {
                    //                            assert.equal(err, null);
                    //                        });
                } catch (e) {
                    // Redirect or error in response. Unimportant.
                } finally {
                    deferred.resolve();
                }
            });
        });

        req.end();
    }
}

//    q.all(promises).then(function(results) {
//        db.close();
//    });
//
//});

