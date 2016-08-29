"use strict";

const pokemonSighting = require(__appbase + 'models/pokemonSighting'),
    pokemonDetail = require(__appbase + 'models/BasicPokemonDetail');

module.exports = {
    /*
     * inserting the pokemon details
     */
    add: function (data, callback) {
        var pokemonSights = new pokemonSighting();

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
        pokemonSighting.find(data, function (err, obj) {
            if (obj.length === 0) {// already existing data and return 0 for indicating
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
        pokemonSighting.find(function (err, pokemons) {
            if (err)
                callback(false,err);
            else
                callback(true,pokemons);
        });
    },

    /*
     * searching the pokemon details by Id
     */
    getById: function (id, callback) {
        this.get({'pokemonId': id}, function (success, message) {
            if (success === 1) {// on successfully finding previous data
                logger.info('message',message);
                callback(success, message);
            } else {//  no previous entry for the particular data exists
                callback(success, message);
            }
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
        }, function (success, message) {
            if (success === 1) {// on successfully finding previous data
                callback(success, message);
            } else {//  no previous entry for the particular data exists
                callback(success, message);
            }
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
        }, function (success, message) {
            if (success === 1) {// on successfully finding previous data
                callback(success, message);
            } else {//  no previous entry for the particular data exists
                callback(success, message);
            }
        });
    },
    /*
     * get the pokemon sightings from a particular source
     */
    getFromSource : function (source, callback) {
        logger.info(source);
        this.get(source , function (success, message) {
            if (success === 1) {// on successfully finding previous data
                logger.info('message',message);
                callback(success, message);
            } else {//  no previous entry for the particular data exists
                callback(success, message);
            }
        });
    },
    /*
     * get all pokemon details
     */
    getAllPokemons : function (callback) {
        pokemonDetail.find(function (err, pokemons) {
            if (err)
                callback(0,err);
            else
                callback(1,pokemons);
        });
    },
    /*
     * get the pokemon details of particular pokemon based on id
     */
    getPokemonById : function (id, callback) {
        pokemonDetail.find({'pokemonID' :id }, function (err, pokemons) {
            if (err)
                callback(0,err);
            else
                callback(1,pokemons);
        });
    },
    /*
     * get the pokemon details of pokemons based on gender
     */
    getPokemonByGender : function (gender, callback) {
        pokemonDetail.find({'gender.abbreviation': gender }, function (err, pokemons) {
            if (err)
                callback(0,err);
            else
                callback(1,pokemons);
        });
    },
    /*
     * get the pokemon details of particular pokemon based on name
     */
    getPokemonByName : function (name, callback) {
        pokemonDetail.find({'name': name }, function (err, pokemons) {
            if (err)
                callback(0,err);
            else
                callback(1,pokemons);
        });
    },
    /*
     * get the pokemon details of pokemons based on resistance
     */
    getPokemonByResistance: function (resistance, callback) {
        pokemonDetail.find({'resistance': resistance }, function (err, pokemons) {
            if (err)
                callback(0,err);
            else
                callback(1,pokemons);
        });
    },

    /*
     * get the pokemon details of pokemons based on weakness
     */
    getPokemonByWeakness: function (weakness, callback) {
        pokemonDetail.find({'weakness': weakness }, function (err, pokemons) {
            if (err)
                callback(0,err);
            else
                callback(1,pokemons);
        });
    },
};