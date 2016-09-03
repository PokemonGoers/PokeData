"use strict";

let mongoose = require('mongoose');
var Schema   = mongoose.Schema;

let pokemonIcon = new Schema({
    pokemonId : {type: Number},
    icon      : {data: String, contentType: String},
});

pokemonIcon.index({"pokemonId": 1}, {"unique": true});
module.exports = mongoose.model('pokemonIcon', pokemonIcon);