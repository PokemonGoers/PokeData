'use strict';

let mongoose = require('mongoose');
let BasicPokemonDetailSchema = new mongoose.Schema({
    pokemonID: {
        type: Number,
        unique: true,
        index: true
    },
    name: {
        type: String
    },
    gender: {
        male: Boolean,
        female: Boolean
    },
    height: {
        value: Number
    },
    weight: {
        value: Number
    },
    category: {
        bug: Boolean,
        grass: Boolean,
        dark: Boolean,
        ground: Boolean,
        dragon: Boolean,
        ice: Boolean,
        electric: Boolean,
        normal: Boolean,
        fairy: Boolean,
        poison: Boolean,
        fighting: Boolean,
        psychic: Boolean,
        fire: Boolean,
        rock: Boolean,
        flying: Boolean,
        steel: Boolean,
        ghost: Boolean,
        water: Boolean
    },
    move: {
        fury_cutter: Boolean,
        bug_bite: Boolean,
        bite: Boolean,
        sucker_punch: Boolean,
        dragon_breath: Boolean,
        thunder_shock: Boolean,
        spark: Boolean,
        low_kick: Boolean,
        karate_chop: Boolean,
        ember: Boolean,
        wing_attack: Boolean,
        peck: Boolean,
        lick: Boolean,
        shadow_claw: Boolean,
        vine_whip: Boolean,
        razor_leaf: Boolean,
        mud_shot: Boolean,
        ice_shared: Boolean,
        frost_breath: Boolean,
        quick_attack: Boolean,
        scratch: Boolean,
        tackle: Boolean,
        pound: Boolean,
        cut: Boolean,
        poison_jab: Boolean,
        acid: Boolean,
        psycho_cut: Boolean,
        rock_throw: Boolean,
        metal_claw: Boolean,
        bullet_punch: Boolean,
        water_gun: Boolean,
        splash: Boolean,
        mud_slap: Boolean,
        zen_headbutt: Boolean,
        confusion: Boolean,
        poison_sting: Boolean,
        bubble: Boolean,
        feint_attack: Boolean,
        steel_wing: Boolean,
        fire_fang: Boolean,
        rock_smash: Boolean
    },
    evolution: {
        type: String
    },
    pre_form: {
        type: String
    }
});

module.exports = mongoose.model('BasicPokemonDetail', BasicPokemonDetailSchema);