"use strict";

var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var rarePokemonSchema = new Schema({
    id         : {type: Number},
    name       : {type: String},
    latitude   : {type: Number},
    longitude  : {type: Number},
    seen_until : {type: Date},
    icon_url   : {type: String}

});

module.exports = mongoose.model('rarePokemon', rarePokemonSchema);