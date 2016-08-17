'use strict'
let fs = require('fs');
let basicPokemonDetail = require('../models/basicPokemonDetail.js');
let pokemonListPath = require('../resources/json/pokemonlist.json'); 

function loadBasicPokemonDetails() {
    console.log('Loading Basic Pokemon Details to MongoDB');
    let data = JSON.stringify(pokemonListPath, function(key,value) {
        var pokemonID, pokemonName;
        if(key != 'name' && typeof value.name !== "undefined") {
            pokemonID = key;
            pokemonName = value.name;
            
            //add pokemonID and pokemonName to collection
            basicPokemonDetail.create({pokemonID: pokemonID, name: pokemonName}, function(err, post){
                if(err) {
                    if (err.name === 'MongoError' && err.code === 11000) {
                        // Duplicate pokemons
                    } else {
                        console.log(err);
                    }
                };
            });
        }
        return value;
    });
}

module.exports = {
    start: loadBasicPokemonDetails
};