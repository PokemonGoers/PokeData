"use strict";
const config = require(__base+'config'),
      PokemonSighting = require(__appbase + 'models/pokemonSighting'),
      common = require(__base + 'app/services/common'),
      moment = require('moment');

module.exports = {
    /*
     * inserting the pokemon sighting details extracted from twitter
     */
    add: function (data, pokemonName) {
        //get the location of the tweet
        let coordinates = null;
        if (data.coordinates){
            pokemonFoundLongitude = data.coordinates.coordinates[0];
            pokemonFoundLatitude = data.coordinates.coordinates[1];
            coordinates = [pokemonFoundLongitude, pokemonFoundLatitude];
        }

        let pokemonId = parseInt(common.getPokemonIdByName(pokemonName));

        console.log(Math.floor(data.timestamp_ms/1000));
        let pokemonSighting = new PokemonSighting({source: config.pokemonDataSources.twitter, location:{type: "Point",coordinates: coordinates},pokemonId: pokemonId, appearedDate: moment.unix(data.timestamp_ms/1000)});
        // saving the data to the database
        pokemonSighting.save(function (err) {
            // on error
            if (err) {
                logger.error("Error while saving pokmon sighting from source twitter");
            }
            // on success
            else {
                logger.info("Pokemon sighting data saved successfully from source twitter");
            }
        });
    }
};