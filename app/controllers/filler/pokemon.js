const PokemonModel = require(__appbase + 'models/pokemon'),
    PokemonStore = require(__appbase + 'stores/pokemon'),
    jsonfile = require('jsonfile'),
    async = require('async'),
    cfg = require(__appbase + '../config');

module.exports = {
    fill: function (callback) {


    },
    insertToDb: function (callback) {
        logger.info('MongoDb Insertion...');
        const file = __tmpbase + 'pokemon.json';

        jsonfile.readFile(file, function (err, pokemons) {
            if (pokemons !== undefined) {
                insert(pokemons);
            }
        });

        var addPokemon = function (pokemon, callback) {
            PokemonStore.add(pokemon, function (success, data) {
                if (success === 1) {
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
