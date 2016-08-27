"use strict";

let fs = require('fs');
const basicPokemonDetail = require(__appbase + '/models/BasicPokemonDetail'),
    pokemonListPath = require(__resourcebase + '/pokemonlist.json');

module.exports = {

    add: function (pokemonID, pokemonName, gender, male_ratio, female_ratio, breedable) {

        basicPokemonDetail.create({
            pokemonID: pokemonID, name: pokemonName,
            gender: {
                abbreviation: gender, male_ratio: male_ratio,
                female_ratio: female_ratio, breedable: breedable
            }
        })
    }
};
