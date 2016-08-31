"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pokemonGoBasicSchema = new Schema({
    pokemonID: Number,
    name: {type: String},
    classification: {type: String},
    types: [String],
    resistance: [String],
    weakness: [String],
    fastAttacks: [{name: {type: String}, type: {type: String}, damage: {type: Number}}],
    specialAttacks: [{name: {type: String}, type: {type: String}, damage: {type: Number}}],
    weight: {
        minimum: {type: String},
        maximum: {type: String}
    },
    height: {
        minimum: {type: String},
        maximum: {type: String}
    },
    fleeRate: Number,
    nextEvolutions: [{pokemonID: Number, name: {type: String}}],
    previousEvolutions: [{pokemonID: Number, name: {type: String}}],
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

pokemonGoBasicSchema.index({"pokemonID": 1}, {"unique": true});

module.exports = mongoose.model('pokemon', pokemonGoBasicSchema);
