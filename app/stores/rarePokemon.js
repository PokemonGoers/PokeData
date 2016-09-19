"use strict";
const rarePokemon = require(__appbase + 'models/pokemonSighting').getSchema(),
      config      = require(__base+'config'),
      common      = require(__appbase + 'services/common');

module.exports = {
    /*
     * inserting the rare pokemon details
     */
    add: function (data, callback) {
        var rarePokemons = new rarePokemon();

        // traversing through the data
        for (var key in data) {
            if (data.hasOwnProperty(key)) {
               // processing the data for coordinates since they are not separated as latitude
               // and longitudes in the original data source
                switch(key){

                    case 'id'    : rarePokemons['pokemonId'] = data[key];
                                   break;

                    case 'coords': let coordsArr = data[key].split(",");
                                   rarePokemons['location']['coordinates'] = [parseFloat(coordsArr[1]), parseFloat(coordsArr[0])];
                                   break;

                    case 'until' :  // calculations for getting the actual spawn time of pokemon
                                    rarePokemons['appearedOn'] = new Date(Date.parse(data[key]) - config.pokemonSpawnTime);
                                    break;

                }
            }
        }

        rarePokemons['source'] = config.pokemonDataSources.pokesniper;
        rarePokemons['localTime'] = common.getRelativeTime(rarePokemons['appearedOn'], rarePokemons['location']['coordinates'][1], rarePokemons['location']['coordinates'][0]);
        // saving the data to the database
        rarePokemons.save(function (err) {
            // on error
            if (err) {
                callback(0, err);
            }
            // on success
            else {
                callback(1, rarePokemons);
            }
        });
    }
};