"use strict";

let mongoose = require('mongoose');
var Schema   = mongoose.Schema;

let sighting = {
    source        : {type: String},
    location      : {type: {type: String, default: 'Point'}, coordinates: {type: [Number]}},
    pokemonId     : {type: Number},
    appearedOn    : {type: Date},
    localTime     : {type: String}
};
let pokemonSighting = new Schema(sighting);

pokemonSighting.index({"location": "2dsphere"}, {"sparse": true});
pokemonSighting.index({"appearedOn": -1, "pokemonId": 1, "location": 1}, {"unique": true});


module.exports = {

    getModel: function () {
        return sighting;
    },
    getSchema: function () {
        return mongoose.model('pokemonSighting', pokemonSighting);
    },
    getMappedModel: function (sighting) {
        /*Check if the sighting object contains any invalid keys.*/
        if (Object.keys(sighting).every(function(key) {
            return ["source", "lng", "lat", "pokemonId", "id", "appearedOn", "localTime"].indexOf(key) !== -1;
        })) {
            return {
                source        : sighting.source.toUpperCase(),
                location      : sighting.lng && sighting.lat && {
                    "$near" : {
                        "$geometry" : { "coordinates" : [Number(sighting.lng), Number(sighting.lat)] },
                        "$maxDistance" : 0
                    }
                },
                pokemonId     : sighting.id || sighting.pokemonId,
                appearedOn    : sighting.appearedOn,
                localTime     : sighting.localTime
            };
        } else {
            return false;
        }
    }
};