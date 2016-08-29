"use strict";

var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var pokeRadarSchema = new Schema({
    id         : {type: String},
    created    : {type: Number},
    downvotes  : {type: Number},
    upvotes    : {type: Number},
    latitude   : {type: Number},
    longitude  : {type: Number},
    pokemonId  : {type: Number},
    trainerName: {type: String},
    userId     : {type: String},
    deviceId   : {type: String}

});

module.exports = mongoose.model('pokeRadar', pokeRadarSchema);