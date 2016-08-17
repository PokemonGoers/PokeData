const PokemonModel = require(__appbase + 'models/pokemon'),
    PokemonStore = require(__appbase + 'stores/pokemon'),
    jsonfile = require('jsonfile'),
    async = require('async'),
    cfg = require(__appbase + '../config/config.json');

module.exports = {
    fill: function(callback) {

        var afterInsertion = function() {
            console.log('Pokemon Insertion Completed');
            callback(false);
        };

        var file = __tmpbase + 'pokemon.json';

        jsonfile.readFile(file, function(err, obj) {
            if(obj !== undefined) {
                module.exports.insertToDb(obj,afterInsertion);
            }
        });
    },
    insertToDb: function(pokemons, callback) {
        console.log('MongoDb Insertion...');

        var addPokemon = function(pokemon, callback) {
            PokemonStore.add(pokemon, function (success, data) {
                console.log((success != 1) ? 'Error:' + data : 'Success: ' + data.pokemonId);
                callback(true);
            });
        };

        var insert = function (pokemons) {
            // iterate through pokemons
            async.forEach(pokemons, function (pokemon, _callback) {
                addPokemon(pokemon, function(){
                    _callback();
                });
            },
                function (err) {
                    callback(true);
                }
            );
        };
        insert(pokemons);
    }
};
