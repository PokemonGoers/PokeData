"use strict";

let fs = require('fs'),
    basicPokemonStore = require(__appbase + 'stores/basicPokemonDetail.js'),
    pokemonListPath = require(__resourcebase + '/pokemonlist.json');
    const async = require('async');

module.exports = {

    insertToDb: function () {


        logger.info('Loading Basic Pokemon Details');

        let data = JSON.stringify(pokemonListPath, function (key, value) {
            var pokemonID, pokemonName, gender, male_ratio, female_ratio, breedable;
            if (key != 'name' && typeof value.name !== "undefined") {
                pokemonID = key;
                pokemonName = value.name;
                gender = value.gender.abbreviation;
                male_ratio = value.gender.male_ratio;
                female_ratio = value.gender.female_ratio;
                breedable = value.gender.breedable;

                basicPokemonStore.add(pokemonID, pokemonName, gender, male_ratio, female_ratio, breedable);

                /*basicPokemonStore.create({
                    pokemonID: pokemonID, name: pokemonName,
                    gender: {
                        abbreviation: gender, male_ratio: male_ratio,
                        female_ratio: female_ratio, breedable: breedable
                    }
                });*/
            }
            return value;
        });
    }
};
