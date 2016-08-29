"use strict";

const http = require('http'),
      fs = require('fs'),
      q = require('q'),
      async = require('async'),
      _ = require('underscore'),
      coords = require(__base + 'resources/json/coords.json');

//To point to currently used proxy in proxyList (0 is no proxy, 1 is first in list...)
var proxyPointer = 0;
//must be array of Strings in format "host:port"
var proxyList = [];
//holds coordinates of pokemon with at least 1 pokemon in them (required for global scan)
if (scanType === 'global') {
    var coordsFile = [];
}
//constructs URL for request to pokeradars API
//pokeradar will return pokemon in the window of lat to lat+delta and lng to lng+delta
const baseLink = function (lat, lng, delta) {
    if (proxyPointer > 0) {
        let hp = proxyList[proxyPointer - 1].split(':');
        return {
            host: hp[0],
            port: hp[1],
            path: 'http://' + config.pokeRadar.host + config.pokeRadar.path + '?minLatitude=' + lat.toString() + '&maxLatitude=' + (lat + delta).toString() + '&minLongitude=' + lng.toString() + '&maxLongitude=' + (lng + delta).toString(),
        };
    } else {
        return {
            host: config.pokeRadar.host,
            path: config.pokeRadar.path + '?minLatitude=' + lat.toString() + '&maxLatitude=' + (lat + delta).toString() + '&minLongitude=' + lng.toString() + '&maxLongitude=' + (lng + delta).toString(),
        };
    }
};


//function that will search for pokemon in window of lat to lat+boxSize and lng to lng+boxSize.
//this window gets subdivided into smaller windows of size delta*delta for which the api call will be executed
//(the subdividing is because pokeradar will not return all pokemon if the window size is above a certain value).
//this will of course happen asynchronously due to the nature of node js
//so be aware that if you choose a too low delta or a too high boxSize pokeradar will not answer all requests
//because you sent too many at once.
//results get passed to the callback function as second parameter.

function searcher(minLat, minLng, boxSize, delta, callback) {

    logger.info("searcher active! latitude: " + minLat + " to " + (minLat+boxSize) + ", longitude: " + minLng + " to " + (minLng+boxSize));
    logger.info("Using proxy number " + proxyPointer + ": " + (proxyPointer === 0 ? "0.0.0.0" : proxyList[proxyPointer-1]));
    //count for how many requests finished (either "response.on('end'..." gets triggered or "req.on('error'...")
    var count = 0;
    var promises = [];
    //here found pokemon are stored
    var pokemons = [];
    //maxCount is total number of requests (note that boxSize should be multiple of delta)
    var maxCount = Math.round((boxSize/delta)*(boxSize/delta));
    //flag if callback was already called
    var cb = false;
    //loop through box
    for (var i = minLat; i < minLat + boxSize; i = i + delta) {
        for (var j = minLng; j < minLng + boxSize; j = j + delta) {
            //generate url
            var options = baseLink(i, j, delta);
            //generate api call
            var req = http.request(options, function (response) {
                //needed for control flow
                var deferred = q.defer();
                promises.push(deferred.promise);
                //stores response
                var str = '';
                //another chunk of data has been received, so append it to `str`
                response.on('data', function (chunk) {
                    str += chunk;
                });
                //error handling
                response.on('error', function () {
                    count++;
                    logger.error("Error in HTTP response!");
                });
                //the whole response has been received, so we append found pokemon
                response.on('end', function () {
                    //increment response counter
                    count++;
                    try {
                        //parse the received string into a JSON
                        var data = JSON.parse(str);
                        //array to hold pokemon
                        var arr = data.data;
                        if (arr.length > 0) {
                            //store received pokemon
                            pokemons = pokemons.concat(arr);
                            logger.info(arr.length + " Pokemon in this box!");
                        }
                    } catch (err) {
                        // Redirect or error in response. Unimportant.
                        //console.log("Response is no JSON! Probably a redirect because search window too big: ",err);
                    } finally {
                        deferred.resolve();
                    }
                    //if all requests are done we can callback
                    if(count === maxCount) {
                        if(!cb){
                            cb = true;
                            if (scanType === 'global' && pokemons.length > 0) {
                                coordsFile.push(minLat + "," + minLng);
                            }
                            logger.info('Finished!\n');
                            callback(null, pokemons);

                        }
                    }
                });
            }).setMaxListeners(0);

            //sets timeout of request to 5 seconds, and if so request gets aborted, triggering req.on('error'...
            req.setTimeout(50000, function() {
                req.abort();
            });

            //handles error in request or timeout
            req.on('error', function(err) {
                //increment because request has finished with error
                count++;
                if(!cb) {
                    cb = true;
                    if (err.code === "ECONNRESET" || err.code === "ETIMEDOUT") {
                        logger.error("Timeout/Connection Reset occured!");
                    } else {
                        logger.error("Request Error occured!", err);
                    }
                    logger.info('Trying again!\n');
                    //request not finished => try again
                    searcher(minLat, minLng, boxSize, delta, callback);
                }
            });
            req.end();
        }
    }
}

function createfunc(j, i, boxSize, delta) {
    return function(callback) { searcher(j, i, boxSize, delta, callback);};
}
module.exports = {
    search: function() {
        //initialize variables
        var funcs = [];
        var boxSize = 5.0;
        //experimental: above 0.5 it does not find as much pokemon as below
        var delta = 0.5;

        //scan for whole world, generates array of functions
        //currently takes 1-2 hours, also pokeradar doesnt answer requests after like 30 seconds of continous scanning
        //but then after 20-30 seconds of not answering, responses are again received => idea: switch to proxy
        if (scanType === 'global') {
            for (var i = -180.0; i <= 180.0 - boxSize; i = i + boxSize){
                for (var j = -90.0; j <= 90.0 - boxSize; j = j + boxSize){
                    funcs.push(createfunc(j, i, boxSize, delta));
                }
            }
        } else if (scanType === 'optimized') {
            for (var i = 0; i < coords.length; i++){
                let c = coords[i].split(',');
                funcs.push(createfunc(parseFloat(c[0]), parseFloat(c[1]), boxSize, delta));
            }
        } else {
            logger.error("Wrong scanType specified!");
        }

        //scan test for western USA
        /*for (var i = -125.0; i <= -100.0 - boxSize; i = i + boxSize) {
            for (var j = 30.0; j <= 50.0 - boxSize; j = j + boxSize) {
                funcs.push(createfunc(j, i, boxSize, delta));
            }
        }*/
        //scan test for LA area
        /*for (var i = -118.5; i <= -118.5; i = i + boxSize) {
            for (var j = 34; j <= 34; j = j + boxSize) {
                funcs.push(createfunc(j, i, boxSize, delta));
            }
        }*/
        //executes array of functions in a series (waits for first function to finish and the calls next one ...)
        //results get stored in pokemon.json file
        async.series(funcs,
            function(err, result) {
                var final = [].concat.apply([], result);
                logger.info(final.length + ' pokemon found!');
                fs.writeFile((__tmpbase+"pokeRadar/pokeRadar_"+parseInt(Math.floor(Date.now() / 1000))+".json").toString(), JSON.stringify(final), function (err) {
                    if (err) {
                        return logger.error(err);
                    }
                    logger.success("The file was saved!");
                });
                if (scanType === 'global') {
                    fs.writeFile(__base + 'resources/json/coords.json', JSON.stringify(_.union(coords, coordsFile)), function (err) {
                        if (err) {
                            return logger.error(err);
                        }
                    });
                }
            });
    }
};
