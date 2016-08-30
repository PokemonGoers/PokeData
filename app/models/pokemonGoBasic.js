"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pokemonGoBasicSchema = new Schema({
    Number: {type: String},
    Name: {type: String},
    Classification: {type: String},
    Types: [String],
    Resistant: [String],
    Weaknesses: [String],
    Fast_Attacks: [{Name: {type: String}, Type: {type: String}, Damage: {type: Number}}],
    Special_Attacks: [{Name: {type: String}, Type: {type: String}, Damage: {type: Number}}],
    Weight: {
        Minimum: {type: String},
        Maximum: {type: String}
    },
    Height: {
        Minimum: {type: String},
        Maximum: {type: String}
    },
    FleeRate: Number,
    Next_evolutions: [{Number: Number, Name: {type: String}}],
    Previous_evolutions: [{Number: Number, Name: {type: String}}],
    MaxCP: Number,
    MaxHP: Number,
    gender: {
        abbreviation: {
            type: String, enum: ['m', 'f', 'g', 'h'] //m=male, f=female, g=genderless, h=hermaphrodite
        },
        male_ratio: Number,
        female_ratio: Number,
        breedable: Boolean
    }

});

module.exports = mongoose.model('pokemonGoBasic', pokemonGoBasicSchema);
