"use strict";

const commonPokemon = require(__appbase + 'models/pokemonSighting').getSchema(),
      async = require('async'),
      config = require(__base + 'config'),
      common = require(__appbase + 'services/common');

module.exports = {
    /*
     * inserting the pokemon details
     */
    add: function (data, callback) {
        var pokemon = new commonPokemon();
        pokemon['source'] = config.pokemonDataSources[collection];

        switch (collection) {
            case 'pokezz':
            case 'pokedexs':
                var poke = data.split('|');
                pokemon['pokemonId'] = parseInt(poke[0]);
                pokemon['appearedOn'] = new Date(parseInt(poke[3]) * 1000 - 15 * 60 * 1000);
                pokemon['location'] = {"type": "Point", "coordinates": [parseFloat(poke[2]), parseFloat(poke[1])]};
                break;
            default:
                logger.error("Collection not known!");
        }

        pokemon['localTime'] = common.getRelativeTime(pokemon['appearedOn'], pokemon['location']['coordinates'][1], pokemon['location']['coordinates'][0]);

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
    },
    /*
     * inserting one pokemon into MongoDB
     */
    addPokemon: function (pokemon) {
        module.exports.add(pokemon, function (success, data) {
            if (success === 1) {
                //logger.success('Success: ' + data);
            } else {
                logger.error('Error:' + data);
            }
        });
    },
    /*
     * inserting an array of pokemon into MongoDB
     */
    insert: function (pokemons) {
        let length = 0;

        async.forEach(pokemons, function (pokemon) {
            length++;
            module.exports.addPokemon(pokemon);
        });
        logger.info('\n length',length);
    }
};
