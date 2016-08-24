"use strict";

let mongoose = require('mongoose');
var Schema   = mongoose.Schema;

let pokemonSighting = new Schema({
    source        : {type: Number},
    location      : {type: String, coordinates: [Number]},
    pokemonId     : {type: Number},
    appearedDate  : {type: Date}
});

module.exports = mongoose.model('pokemonSighting', pokemonSighting);