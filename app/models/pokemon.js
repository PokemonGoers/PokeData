"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

let pokemon = {
    pokemonId: Number,
    description: {type: String},
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
    },
    rarityRank: Number,
    appearanceLikelihood: Number
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
        let attack_type_expr, attack_name_expr, attack_damage_expr;
        let search_by = [];

        if (pokemon.attackType) {
            attack_type_expr = new RegExp('^' + pokemon.attackType + '$', 'i');
            search_by.push({$or: [{"fastAttacks.type": attack_type_expr}, {"specialAttacks.type": attack_type_expr}]});
        }
        if (pokemon.attackName) {
            attack_name_expr = new RegExp('^' + pokemon.attackName + '$', 'i');
            search_by.push({$or: [{"fastAttacks.name": attack_name_expr}, {"specialAttacks.name": attack_name_expr}]});
        }

        if (pokemon.minAttackDamage) {
            attack_damage_expr = {};
            attack_damage_expr["$gte"] = pokemon.minAttackDamage;
        }
        if (pokemon.maxAttackDamage) {
            attack_damage_expr = attack_damage_expr || {};
            attack_damage_expr["$lt"] = pokemon.maxAttackDamage;
        }

        if (attack_damage_expr) {
            search_by.push({$or: [{"fastAttacks.damage": attack_damage_expr},
                {"specialAttacks.damage": attack_damage_expr}
            ]});
        }

        if (pokemon.evolution) {
            search_by.push({$or: [{"nextEvolutions.pokemonId": pokemon.evolution},
                {"previousEvolutions.pokemonId": pokemon.evolution}
            ]});
        }

        let mappedModel = {
            "pokemonId": pokemon.id || pokemon.pokemonId,
            "name": new RegExp('^.*' + pokemon.name + '.*$', 'i'),
            "icon": pokemon.icon,
            "classification": pokemon.classification,
            "types": pokemon.type && pokemon.type.toLowerCase(),
            "resistance": pokemon.resistance && pokemon.resistance.toLowerCase(),
            "weakness": pokemon.weakness && pokemon.weakness.toLowerCase(),
            "weight.minimum": pokemon.minWeight,
            "weight.maximum": pokemon.maxWeight,
            "height.minimum": pokemon.minHeight,
            "height.maximum": pokemon.maxHeight,
            "fleeRate": pokemon.fleeRate,
            "maxCP": pokemon.maxCP,
            "maxHP": pokemon.maxHP,
            "gender.abbreviation": pokemon.gender && pokemon.gender.toLowerCase(),
            "rarityRank": pokemon.rarityRank,
            "appearanceLikelihood": pokemon.appearanceLikelihood
        };

        if (search_by.length > 1) {
            mappedModel["$and"] = search_by
        } else if (search_by.length === 1) {
            mappedModel["$or"] = search_by[0]["$or"];
        }

        return mappedModel;
    }
};