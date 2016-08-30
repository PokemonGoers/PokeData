"use strict";

let mongoose = require('mongoose');
var Schema   = mongoose.Schema;

let pokemonIcon = new Schema({
    pokemonId    : {type: Number},
    icon         : {data: Buffer, contentType: String}
});

module.exports = mongoose.model('pokemonIcon', pokemonIcon);