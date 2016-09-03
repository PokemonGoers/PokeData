"use strict";

let mongoose = require('mongoose');
var Schema   = mongoose.Schema;

let pokemonSighting = new Schema({
    source        : {type: String},
    location      : {type: {type: String, default: 'Point'}, coordinates: {type: [Number]}},
    pokemonId     : {type: Number},
    appearedOn    : {type: Date}
});

pokemonSighting.index({"location": "2dsphere"}, {"sparse": true});
pokemonSighting.index({"appearedOn": -1, "pokemonId": 1, "location": 1}, {"unique": true});

module.exports = mongoose.model('pokemonSighting', pokemonSighting);