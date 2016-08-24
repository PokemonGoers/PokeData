"use strict";
const config = require(__base+'config'),
      PokemonSighting = require(__appbase + 'models/pokemonSighting')

module.exports = {
    /*
     * inserting the pokemon sighting details extracted from twitter
     */
    add: function (data) {
        //get the location of the tweet
        let coordinates = null;
        if (data.coordinates){
            pokemonFoundLongitude = data.coordinates.coordinates[0];
            pokemonFoundLatitude = data.coordinates.coordinates[1];
            coordinates = [pokemonFoundLongitude, pokemonFoundLatitude];
        }

        let pokemonSighting = new PokemonSighting({source: config.pokemonDataSources.twitter, location:{type: "Point",coordinates: coordinates},appearedDate: new Date(data.timestamp_ms)});
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