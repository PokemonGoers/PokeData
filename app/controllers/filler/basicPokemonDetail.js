const PokemonModel = require(__appbase + 'models/pokemon'),
    PokemonStore = require(__appbase + 'stores/pokemon'),
    jsonfile = require('jsonfile'),
    async = require('async'),
    cfg = require(__appbase + '../config');

let fs = require('fs'),
    basicPokemonDetail = require('../../models/BasicPokemonDetail.js'),
    pokemonListPath = require('../../../resources/json/pokemonlist.json');

module.exports = {
    fill:

        function loadBasicPokemonDetails() {
            logger.info('Loading Basic Pokemon Details to MongoDB');

            let data = JSON.stringify(pokemonListPath, function(key,value) {
                var pokemonID, pokemonName, gender, male_ratio, female_ratio, breedable;
                if(key != 'name' && typeof value.name !== "undefined") {
                    pokemonID = key;
                    pokemonName = value.name;
                    gender = value.gender.abbreviation;
                    male_ratio = value.gender.male_ratio;
                    female_ratio = value.gender.female_ratio;
                    breedable = value.gender.breedable;

                    basicPokemonDetail.create({pokemonID: pokemonID, name: pokemonName,
                            gender: {abbreviation: gender, male_ratio: male_ratio,
                                female_ratio: female_ratio, breedable: breedable}},
                        function(err, post){
                            if(err) {
                                if (err.name === 'MongoError' && err.code === 11000) {
                                    // TODO Handling for duplicate pokemons
                                } else {
                                    logger.error(err);
                                }
                            } else {
                                logger.info(post);
                            }
                        });
                }
                return value;
            });
        }

    ,
    insertToDb: function (callback) {
        logger.info('MongoDb Insertion...');
        const file = __resourcebase + 'pokemonlist.json';

        jsonfile.readFile(file, function (err, pokemons) {
            if (pokemons !== undefined) {
                insert(pokemons);
            }
        });

        var addPokemon = function (pokemon, callback) {
            PokemonStore.add(pokemon, function (success, data) {
                if (success != 1) {
                    logger.success('Success: ' + data.pokemonId);
                } else {
                    logger.error('Error:' + data);
                }
                callback(true);
            });
        };

        var insert = function (pokemons) {
            // iterate through pokemons
            async.forEach(pokemons, function (pokemon, callback) {

                PokemonStore.getById(pokemon.id, function (success, oldId) {
                    if (success === 1) { // old entry is existing and discarded
                        logger.info(pokemon.id + " is a duplicate entry and hence discarded.");
                        callback();
                    } else {// new entry is added
                        addPokemon(pokemon, function () {
                            callback();
                        });
                    }
                });
            }, function (err) {
                callback(true);
            });
        };
    }
};
