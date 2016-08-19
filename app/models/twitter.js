'use strict';

let mongoose = require('mongoose');
let twitter = new mongoose.Schema({
    pokemonName: {
        type: String,
        unique: true,
        index: true
    },
    found_at: {
        latitude: Number,
        longitude: Number,
    },
    appeared_on: {type: Date, default: Date.now}  
});

module.exports = mongoose.model('twitter', twitter);