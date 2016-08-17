'use strict'

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
})

module.exports = mongoose.model('BasicPokemonDetail', BasicPokemonDetailSchema)