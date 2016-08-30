"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pokemonGoBasicSchema = new Schema({
    pokemonId: Number,
    name: {type: String},
    classification: {type: String},
    types: [String],
    resistant: [String],
    weaknesses: [String],
    fastAttacks: [{Name: {type: String}, Type: {type: String}, Damage: {type: Number}}],
    specialAttacks: [{Name: {type: String}, Type: {type: String}, Damage: {type: Number}}],
    weight: {
        Minimum: {type: String},
        Maximum: {type: String}
    },
    height: {
        Minimum: {type: String},
        Maximum: {type: String}
    },
    fleeRate: Number,
    nextEvolutions: [{Number: Number, Name: {type: String}}],
    previousEvolutions: [{Number: Number, Name: {type: String}}],
    maxCP: Number,
    maxHP: Number,
    gender: {
        abbreviation: {
            type: String, enum: ['m', 'f', 'g', 'h'] //m=male, f=female, g=genderless, h=hermaphrodite
        },
        maleRatio: Number,
        femaleRatio: Number,
        breedable: Boolean
    }

});

module.exports = mongoose.model('pokemon', pokemonGoBasicSchema);
