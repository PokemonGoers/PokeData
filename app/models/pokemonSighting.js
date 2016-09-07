"use strict";

let mongoose = require('mongoose');
var Schema   = mongoose.Schema;

let sighting = {
    source        : {type: String},
    location      : {type: {type: String, default: 'Point'}, coordinates: {type: [Number]}},
    pokemonId     : {type: Number},
    appearedOn    : {type: Date}
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
        return {
            source        : sighting.source.toUpperCase(),
            location      : sighting.location && {
                "$near" : {
                    "$geometry" : { "coordinates" : sighting.location.split(',').map(Number) },
                    "$maxDistance" : 0
                }
            },
            pokemonId     : sighting.id || sighting.pokemonId,
            appearedOn    : sighting.appearedOn
        };
    }
};