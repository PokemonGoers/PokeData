"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

let pokemon = {
    pokemonId: Number,
    name: {type: String},
    icon: {type: String},
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
    nextEvolutions: [{pokemonId: Number, name: {type: String}}],
    previousEvolutions: [{pokemonId: Number, name: {type: String}}],
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
};

var pokemonGoBasicSchema = new Schema(pokemon);

pokemonGoBasicSchema.index({"pokemonId": 1}, {"unique": true});

module.exports = {

    getModel: function () {
        return pokemon;
    },
    getSchema: function () {
        return mongoose.model('pokemon', pokemonGoBasicSchema);
    },
    getMappedModel: function (pokemon) {
        return {
            pokemonId: pokemon.id || pokemon.pokemonId,
            name: pokemon.name,
            icon: pokemon.icon,
            classification: pokemon.classification,
            types: pokemon.type && pokemon.type.toLowerCase(),
            resistance: pokemon.resistance && pokemon.resistance.toLowerCase(),
            weakness: pokemon.weakness && pokemon.weakness.toLowerCase(),
            // fastAttacks: [{name: {type: String}, type: {type: String}, damage: {type: Number}}],
            // specialAttacks: [{name: {type: String}, type: {type: String}, damage: {type: Number}}],
            /*weight: pokemon.weight && {
                minimum: pokemon.weight.min,
                maximum: pokemon.weight.max
            },
            height: pokemon.height && {
                minimum: pokemon.height.min,
                maximum: pokemon.height.max
            },*/
            fleeRate: pokemon.fleeRate,
            // nextEvolutions: pokemon.next && [{pokemonId: pokemon.next.id, name: pokemon.next.name}],
            // previousEvolutions: pokemon.prev && [{pokemonId: pokemon.prev.id, name: pokemon.prev.name}],
            maxCP: pokemon.maxCP,
            maxHP: pokemon.maxHP,
            "gender.abbreviation": pokemon.gender && pokemon.gender.toLowerCase()
        };
    }
};