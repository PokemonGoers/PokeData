'use strict';

let mongoose = require('mongoose');
let twitter = new mongoose.Schema({
    tweetId: {
        type: String,
        unique: true
    },
    pokemonName: {
        type: String
    },
    foundAt: {
        latitude: Number,
        longitude: Number,
    },
    appearedOn: {type: String}  
});

module.exports = mongoose.model('pokemonAppearances', twitter);