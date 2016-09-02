"use strict";

let mongoose = require('mongoose');
var Schema   = mongoose.Schema;

let pokemonIcon = new Schema({
    pokemonID : {type: Number},
    icon      : {data: String, contentType: String},
});

pokemonIcon.index({"pokemonID": 1}, {"unique": true});
module.exports = mongoose.model('pokemonIcon', pokemonIcon);