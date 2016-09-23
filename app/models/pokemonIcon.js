"use strict";

let mongoose = require('mongoose');
var Schema   = mongoose.Schema;

let pokemonIcon = new Schema({
    pokemonId : {type: Number},
    iconGif   : {data: Buffer, contentType: String},
    iconPng   : {data: Buffer, contentType: String},
    iconSvg   : {data: Buffer, contentType: String}
});

pokemonIcon.index({"pokemonId": 1}, {"unique": true});
module.exports = mongoose.model('pokemonIcon', pokemonIcon);