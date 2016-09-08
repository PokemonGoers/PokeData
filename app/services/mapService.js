"use strict";

const http = require('http'),
      https = require('https'),
      fs = require('fs'),
      q = require('q'),
      async = require('async'),
      _ = require('underscore'),
      zlib = require('zlib'),
      coords = require(__base + 'resources/json/coords/' + collection + 'Coords.json'),
      config = require(__base + 'config'),
      store = require(__appbase + 'stores/mapService');

//To point to currently used proxy in proxyList (0 is no proxy, 1 is first in list...)
var proxyPointer = 0;
//must be array of Strings in format "host:port"
var proxyList = [];
//holds coordinates of pokemon with at least 1 pokemon in them (required for global scan)
if (scanType === 'global') {
    var coordsFile = [];
}
//constructs URL for request to the services API
//service will return pokemon in the window of lat to lat+delta and lng to lng+delta
const baseLink = function (lat, lng, delta) {
    var hd_sl = {
        'Host': 'skiplagged.com',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:44.0) Gecko/20100101 Firefox/44.0',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'de,en-US;q=0.7,en;q=0.3',
        'Accept-Encoding': 'gzip, deflate',
        'Referer': 'https://skiplagged.com/catch-that/',
        'Connection': 'keep-alive'
    };
    var hd_fp = {
        'Host': 'cache.fastpokemap.se',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:48.0) Gecko/20100101 Firefox/48.0',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'de,en-US;q=0.7,en;q=0.3',
        'Accept-Encoding': 'gzip, deflate, br',
        'Origin': 'https://fastpokemap.se',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
        'Cache-Control': 'max-age=0'
    };
    var queryString = '';
    var link = {};
    if (proxyPointer > 0) {
        var hp = proxyList[proxyPointer - 1].split(':');
        link.host = hp[0];
        link.port = hp[1];
        var scheme = collection === 'pokecrew' ? 'https://' : 'http://';
        link.path = scheme + config[collection].host + config[collection].path;
    } else {
        link.host = config[collection].host;
        link.path = config[collection].path;
    }
    switch (collection) {
        case 'pokeRadar':
            queryString = '?minLatitude=' + lat.toString() + '&maxLatitude=' + (lat + delta).toString() + '&minLongitude=' + lng.toString() + '&maxLongitude=' + (lng + delta).toString();
            break;
        case 'skiplagged':
            queryString = '?bounds=' + lat.toFixed(6) + ',' + lng.toFixed(6) + ',' + (lat + delta).toFixed(6) + ',' + (lng + delta).toFixed(6);
            link['headers'] = hd_sl;
            break;
        case 'pokecrew':
            queryString = '?northeast_latitude=' + lat.toString() + '&northeast_longitude=' + lng.toString() + '&southwest_latitude=' + (lat + delta).toString() + '&southwest_longitude=' + (lng + delta).toString();
            break;
        case 'fastpokemap':
            queryString = '?key=allow-all&ts=0&lat='+ lat.toString() + '&lng=' + lng.toString();
            link['headers'] = hd_fp;
            break;
        default:
            logger.error("Collection not known!");
    }
    link.path += queryString;
    return link;

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
    var pokemons = 0;
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
            var proto = collection === 'pokecrew' ? https : http;
            var req = proto.request(options, function (response) {
                //needed for control flow
                var deferred = q.defer();
                promises.push(deferred.promise);
                //stores response
                var body = [];
                //another chunk of data has been received, so append it to `str`
                response.on('data', function (chunk) {
                    body.push(chunk);
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
                        var data;
                        if (collection === 'fastpokemap') {
                            try {
                                //check if it uses deflate encoding
                                var buf = Buffer.concat(body);
                                data = JSON.parse(zlib.inflateSync(buf).toString('utf8'));
                            } catch (err) {
                                data = JSON.parse(body.toString());
                            }
                        } else {
                            //if not just parse it as ascii/utf8
                            data = JSON.parse(body.toString());
                        }
                        //array to hold pokemon
                        var arr = [];
                        switch (collection) {
                            case 'pokeRadar':
                                arr = data.data;
                                break;
                            case 'skiplagged':
                                arr = data.pokemons;
                                break;
                            case 'pokecrew':
                                arr = data.seens;
                                break;
                            case 'fastpokemap':
                                arr = data;
                                break;
                            default:
                                logger.error("Collection not known!");
                        }
                        if (arr.length > 0) {
                            //store received pokemon
                            store.insert(arr);
                            pokemons += arr.length;
                            logger.info(arr.length + " Pokemon in this box!");
                        }
                    } catch (err) {
                        // Redirect or error in response. Unimportant.
                        //logger.error(err);
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

            //sets timeout of request to 10 seconds, and if so request gets aborted, triggering req.on('error'...
            req.setTimeout(10000, function() {
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
        var boxSize;
        var delta;
        if (collection === 'fastpokemap') {
            boxSize = 0.5;
            delta = 0.026 * Math.sqrt(2);
        } else {
            boxSize = 5.0;
            delta = 0.5;
        }

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
            for (var i = 0; i < coords.length; i++) {
                var c = coords[i].split(',');
                if (collection === 'fastpokemap') {
                    for (var j = 0; j < 5; j+=0.5) {
                        for (var k = 0; k < 5; k+=0.5) {
                            funcs.push(createfunc(parseFloat(c[0]) + j, parseFloat(c[1]) + k, boxSize, delta));
                        }
                    }
                } else {
                    funcs.push(createfunc(parseFloat(c[0]), parseFloat(c[1]), boxSize, delta));
                }
            }
        } else {
            logger.error("Wrong scanType specified!");
        }

        //executes array of functions in a series (waits for first function to finish and the calls next one ...)
        //results get stored in pokemon.json file
        async.series(funcs,
            function(err, result) {
                var sum = result.reduce(function (a, b) {return a + b;}, 0);
                logger.info(sum + ' pokemon found!');
                if (scanType === 'global') {
                    fs.writeFile(__base + 'resources/json/coords/' + collection + 'Coords.json', JSON.stringify(_.union(coords, coordsFile)), function (err) {
                        if (err) {
                            return logger.error(err);
                        }
                    });
                }
                module.exports.search();
            });
    }
};
