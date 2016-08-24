"use strict";
const commonPokemon = require(__appbase + 'models/pokemonSighting'),
      config      = require(__base+'config');

module.exports = {
    /*
     * inserting the pokemon details
     */
    add: function (data, callback) {
        var pokemon = new commonPokemon();
        pokemon['source'] = config['pokemonDataSources']['pokeRadar'];
        pokemon['pokemonId'] = data['pokemonId'];
        pokemon['appearedDate'] = new Date(data['created'] * 1000);
        pokemon['location']['type'] = "Point";
        pokemon['location']['coordinates'] = [data['longitude'], data['latitude']];


        // saving the data to the database
        pokemon.save(function (err) {
            // on error
            if (err) {
                callback(0, err);
            }
            // on success
            else {
                callback(1, pokemon);
            }
        });
    }
};
