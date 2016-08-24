"use strict";
const config      = require(__base+'config'),
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
            //location:{type: "Point",coordinates: coordinates}
        /*pokemonSighting.create({source: config.pokemonDataSources.twitter, appearedDate: new Date(data.timestamp_ms)}, function (err, post) {
            if (err) {
                if (err.name === 'MongoError' && err.code === 11000) {
                    logger.error('Duplicate error');
                    logger.info(tweetObj.id_str + 'tweet was discarded');
                    callback(0,err);
                } else {
                    logger.error(err);
                    callback(0,err);
                }
            } else {
                logger.info('Adding tweet to DB');
                callback(1,pokemonSighting);
            }
        });*/
        let pokemonSighting = new PokemonSighting({source: config.pokemonDataSources.twitter, location:{type: "Point",coordinates: coordinates},appearedDate: new Date(data.timestamp_ms)});
        logger.info("SAVE,SAVE");
        // saving the data to the database
        pokemonSighting.save(function (err) {
            logger.info("SAVE");
            // on error
            if (err) {
                logger.error("Error while saving pokmon sighting from source twitter");
                //callback(0, err);
            }
            // on success
            else {
                logger.info("Pokemon sighting data saved successfully from source twitter");
                //callback(1, pokemonSightings);
            }
        });
    }
};