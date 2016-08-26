"use strict";

let mongoose = require('mongoose');
var Schema   = mongoose.Schema;

let pokemonSighting = new Schema({
    source        : {type: String},
    location      : {type: {type: String, default: 'Point'}, coordinates: [Number]},
    pokemonId     : {type: Number},
    appearedOn    : {type: Date}
});

module.exports = mongoose.model('pokemonSighting', pokemonSighting);