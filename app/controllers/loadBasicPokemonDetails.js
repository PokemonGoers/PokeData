'use strict';

let fs = require('fs'),
    basicPokemonDetail = require('../models/BasicPokemonDetail.js'),
    pokemonListPath = require('../../resources/json/pokemonlist.json');

function loadBasicPokemonDetails() {
    console.log('Loading Basic Pokemon Details to MongoDB');

    let data = JSON.stringify(pokemonListPath, function(key,value) {
        var pokemonID, pokemonName, gender, male_ratio, female_ratio;
        if(key != 'name' && typeof value.name !== "undefined") {
            pokemonID = key;
            pokemonName = value.name;
            gender = value.gender.abbreviation;
            male_ratio = value.gender.male_ratio;
            female_ratio = value.gender.female_ratio;

            basicPokemonDetail.create({pokemonID: pokemonID, name: pokemonName,
                gender: {abbreviation: gender, male_ratio: male_ratio, female_ratio: female_ratio}},
                function(err, post){
                if(err) {
                    if (err.name === 'MongoError' && err.code === 11000) {
                        // TODO Handling for duplicate pokemons
                    } else {
                        console.log(err);
                    }
                } else {
                    console.log(post);
                }
            });
        }
        return value;
    });
}

module.exports = {
    start: loadBasicPokemonDetails
};