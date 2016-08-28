"use strict";

const http = require('http'),
      fs = require('fs'),
      q = require('q'),
      async = require('async'),
      ProxyLists = require('proxy-lists'),
      proxyChecker = require('proxy-checker');


var proxyPointer = 0;
var proxyList = [];

//constructs URL for request to pokeradars API
//pokeradar will return pokemon in the window of lat to lat+delta and lng to lng+delta
//proxied: boolean if specified proxy (host, port) should be used
const baseLink = function (lat, lng, delta) {
    if (proxyPointer > 0) {
        let hp = proxyList[proxyPointer - 1].split(':');
        return {
            host: hp[0],
            port: hp[1],
            path: 'http://www.pokeradar.io/api/v1/submissions?minLatitude=' + lat.toString() + '&maxLatitude=' + (lat + delta).toString() + '&minLongitude=' + lng.toString() + '&maxLongitude=' + (lng + delta).toString(),
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.13) Gecko/20080311 Firefox/2.0.0.13'
            }
        };
    } else {
        return {
            host: 'www.pokeradar.io',
            path: '/api/v1/submissions?minLatitude=' + lat.toString() + '&maxLatitude=' + (lat + delta).toString() + '&minLongitude=' + lng.toString() + '&maxLongitude=' + (lng + delta).toString(),
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.13) Gecko/20080311 Firefox/2.0.0.13'
            }
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
                    count++;
                    try {
                        var data = JSON.parse(str);
                        if (data.data.length > 0) {
                            pokemons = pokemons.concat(data.data);
                            logger.info(data.data.length + " Pokemon in this box!");
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
                            if (pokemons.length > 0) {
                                fs.appendFile("found.txt", minLat + "," + minLng + "\n", function(err) {
                                    if(err) {
                                        return console.log(err);
                                    }
                                });
                            }
                            logger.info('Finished!\n');
                            callback(null, pokemons);

                        }
                    }
                });
            }).setMaxListeners(0);

            //sets timeout of request to 5 seconds, and if so request gets aborted, triggering req.on('error'...
            req.setTimeout(5000, function() {
                req.abort();
            });

            //handles error in request or timeout
            req.on('error', function(err) {
                count++;
                if(!cb) {
                    cb = true;
                    proxyPointer = (++proxyPointer) % (proxyList.length + 1);
                    logger.info("Using number " + proxyPointer + ": " + proxyList[proxyPointer-1]);
                    if (err.code === "ECONNRESET" || err.code === "ETIMEDOUT") {
                        logger.error("Timeout/Connection Reset occured!");
                    } else {
                        logger.error("Request Error occured!", err);
                    }
                    logger.info('Trying again!\n');
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
        //initialize proxies
        var pOptions = {
            anonymityLevels: ['elite'],
            sourcesWhiteList: ['freeproxylists','bitproxies', 'hidemyass', 'proxydb'],
            bitproxies: {apiKey: 'J0Rkg7Y4p81lrquleGPU6MER4KYA1APc'}
        };
        var gettingProxies = ProxyLists.getProxies(pOptions);
        var proxySet = new Set();
        gettingProxies.on('data', function(proxies) {
            for(var i = 0; i < proxies.length; i++) {
                var proxy = proxies[i];
                proxyChecker.checkProxy(proxy.ipAddress, proxy.port, {url: 'http://www.pokeradar.io/api/v1/submissions?minLatitude=33.756886&maxLatitude=33.773&minLongitude=-118.175&maxLongitude=-118.1569', regex: /pokemonId/}, function(host, port, ok, statusCode, err) {
                    if(ok){
                        proxySet.add(host + ":" + port);
                        proxyList = Array.from(proxySet);
                    }
                })
            }
        });

        gettingProxies.on('error', function(error) {
            // Some error has occurred.
            logger.error(error);
        });

        gettingProxies.once('end', function() {
            //finished
        });
        //initialize variables
        var funcs = [];
        var boxSize = 5.0;
        //experimental: above 0.5 it does not find as much pokemon as below
        var delta = 0.5;

        //scan for whole world, generates array of functions
        //currently takes 1-2 hours, also pokeradar doesnt answer requests after like 30 seconds of continous scanning
        //but then after 20-30 seconds of not answering, responses are again received => idea: switch to proxy
        //another idea: dont scan on on water => reduces scanning area about 60%
        for (var i = -180.0; i <= 180.0 - boxSize; i = i + boxSize){
            for (var j = -90.0; j <= 90.0 - boxSize; j = j + boxSize){
                funcs.push(createfunc(j, i, boxSize, delta));
            }
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
            });
    }
};
