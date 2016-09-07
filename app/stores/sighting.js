"use strict";

const _ = require('underscore'),
    sightingModel = require(__appbase + 'models/pokemonSighting'),
    Sighting = sightingModel.getSchema();

module.exports = {
    /*
     * inserting the pokemon details
     */
    add: function (data, callback) {
        var pokemonSights = new Sighting();

        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                pokemonSights[key] = data[key];
            }
        }
        pokemonSights.save(function (err) {
            // on error
            if (err) {
                callback(0, err);
            }
            // on success
            else {
                callback(1, pokemonSights);
            }
        });
    },
    /*
     * fetching the particular pokemon details
     */
    get: function (data, callback) {
        Sighting.find(data, function (err, obj) {
            if (!obj || err) {// already existing data and return 0 for indicating
                callback(0, data);
            } else { // new data and return 1 for indicating
                callback(1, obj);
            }
        });
    },

    /*
     * fetching all the pokemon details
     */
    getAll: function (callback) {
        this.get(undefined, function (status, response) {
            callback(status, response);
        });
    },

    /*
     * searching the pokemon details by Id
     */
    getById: function (id, callback) {
        this.get({'pokemonId': id}, function (status, response) {
            callback(status, response);
        });
    },

    /*
     * searching the pokemon sightings at a particular coordinate
     */
    getAtCoordinates: function (reqObj, callback) {
        this.get({
            "location" : {
                "$near" : {
                    "$geometry" : { "coordinates" : [reqObj.longitude, reqObj.latitude] },
                    "$maxDistance" : 0
                }
            }
        }, function (status, response) {
            callback(status, response);
        });
    },

    /*
     * searching the pokemon sightings between a set of coordinates
     */
    getBetweenCoordinates: function (reqObj, callback) {
        this.get({
            location: {
                $within: {
                    $box: [
                        [reqObj.startLongitude, reqObj.startLatitude], [reqObj.endLongitude,reqObj.endLatitude] ]
                }
            }
        }, function (status, response) {
            callback(status, response);
        });
    },
    /*
     * get the pokemon sightings from a particular source
     */
    getFromSource : function (source, callback) {
        this.get({'source': source}, function (status, response) {
            callback(status, response);
        });
    },

    /*
     * get the pokemon sightings within a specific time range
     */
    getByTimeRange : function (req, callback) {
        let range = (req.range) || '1d',
            fromTs = new Date(req.ts),
            toTs;

        let rangeValue = parseInt(range, 10),
            rangeSpan = range.replace(/\d+/g, '');

        switch(rangeSpan) {
            // week
            case 'w':
                toTs = new Date(fromTs.getTime() + rangeValue * 7 * 24 * 60 * 60 * 1000);
                break;
            // day
            case 'd':
                toTs = new Date(fromTs.getTime() + rangeValue * 24 * 60 * 60 * 1000);
                break;
            // hour
            case 'h':
                toTs = new Date(fromTs.getTime() + rangeValue * 60 * 60 * 1000);
                break;
            // minute
            case 'm':
                toTs = new Date(fromTs.getTime() + rangeValue * 60 * 1000);
                break;
        }

        this.get({"appearedOn": {
            $gte: fromTs.toUTCString(),
            $lte: toTs.toUTCString()
        }}, function (status, response) {
            callback(status, response);
        });
    },
    /*
     * get the pokemon sightings matching the specified search parameters
     */
    search: function (query, callback) {
        let formatted_query = sightingModel.getMappedModel(query);
        if (formatted_query) {
            /*Exclude parameters that are undefined or null i.e., parameters that were not set in the query*/
            formatted_query = _.omit(formatted_query, function(value) {
                return _.isUndefined(value) || _.isNull(value);
            });
            this.get(formatted_query, function (status, response) {
                callback(status, response);
            });
        } else {
            callback(0, "Invalid query parameters");
        }
    }
};