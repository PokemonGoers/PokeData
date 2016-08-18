'use strict';

let fs = require('fs'),
    basicPokemonDetail = require('../models/basicPokemonDetail.js'),
    pokemonListPath = require('../resources/json/pokemonlist.json');

function loadBasicPokemonDetails() {
    console.log('Loading Basic Pokemon Details to MongoDB');

    let data = JSON.stringify(pokemonListPath, function(key,value) {
        var pokemonID, pokemonName, male, female, gender;
        if(key != 'name' && typeof value.name !== "undefined") {
            pokemonID = key;
            pokemonName = value.name;
            male = value.gender.male;
            female = value.gender.female;
            if (female) {
                gender = female;
            } else {
                gender = male;
            }
            
            //add pokemonID and pokemonName to collection
            basicPokemonDetail.create({pokemonID: pokemonID, name: pokemonName, gender: gender}, function(err, post){
                if(err) {
                    if (err.name === 'MongoError' && err.code === 11000) {
                        // TODO Handling for duplicate pokemons
                    } else {
                        console.log(err);
                    }
                }
            });
        }
        return value;
    });
}

module.exports = {
    start: loadBasicPokemonDetails
};