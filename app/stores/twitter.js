"use strict";
const config = require(__base+'config'),
      PokemonSighting = require(__appbase + 'models/pokemonSighting').getSchema(),
      common = require(__base + 'app/services/common'),
      moment = require('moment'),
      request = require('request'),
      twitterLinkLength = 23;

module.exports = {
    /*
     * inserting the pokemon sighting details extracted from twitter
     */
    add: function (data, pokemonName) {

        let location = null,
            pokemonId = parseInt(common.getPokemonIdByName(pokemonName)),
            pokemonSighting = new PokemonSighting({source: config.pokemonDataSources.twitter, pokemonId: pokemonId, appearedOn: moment.unix(data.timestamp_ms/1000)});

       /* */
        
        //get the location of the tweet if exist
        var pokemonFoundLongitude;
        var pokemonFoundLatitude;
        if (data.coordinates){
            pokemonFoundLongitude = data.coordinates.coordinates[0];
            pokemonFoundLatitude = data.coordinates.coordinates[1];
            location = {type: "Point",coordinates: [pokemonFoundLongitude, pokemonFoundLatitude]};
            savePokemonSighthing(pokemonSighting);
        } else if(data.text.indexOf('https://t.co') != -1) { // check if external link exist in the tweet
                let url = data.text.substr(data.text.indexOf('https://t.co'), twitterLinkLength); // get the required external url
                logger.info(url);
                request.get(url)
                .on('response', function(response) {
                    if(response.statusCode == 200) {
                        // check if the link is related to google maps
                        if(typeof response.request.uri !== 'undefined' && response.request.uri.host === "www.google.com" && typeof response.request.uri.pathname !== 'undefined') {
                            let googleMapsPath = response.request.uri.pathname;
                            logger.info(googleMapsPath);
                            
                            // check the link path and get the latitude and longitude 
                            if(googleMapsPath.indexOf('search') != -1) { // path is of the form /maps/place/40.4377315739453,-79.9990332286566
                                pokemonFoundLatitude = parseFloat(googleMapsPath.substr(googleMapsPath.indexOf('search/') + 7, googleMapsPath.indexOf(',') - googleMapsPath.indexOf('search/') - 5 ));
                                pokemonFoundLongitude = parseFloat(googleMapsPath.substr(googleMapsPath.indexOf(',') + 1, googleMapsPath.length));
                            } else if(googleMapsPath.indexOf('place') != -1) { // path is of the form /maps/search/40.4377315739453,-79.9990332286566
                                pokemonFoundLatitude = parseFloat(googleMapsPath.substr(googleMapsPath.lastIndexOf('place/') + 6, googleMapsPath.indexOf(',') - googleMapsPath.lastIndexOf('place/') - 5));
                                pokemonFoundLongitude = parseFloat(googleMapsPath.substr(googleMapsPath.indexOf(',') + 1, googleMapsPath.length));
                            } else if(googleMapsPath.indexOf('Location') != -1) { // path is of the form /maps/current+Location/40.4377315739453,-79.9990332286566
                                pokemonFoundLatitude = parseFloat(googleMapsPath.substr(googleMapsPath.lastIndexOf('Location/') + 9, googleMapsPath.indexOf(',') - googleMapsPath.lastIndexOf('Location/') - 7));
                                pokemonFoundLongitude = parseFloat(googleMapsPath.substr(googleMapsPath.indexOf(',') + 1, googleMapsPath.length));
                            }

                            location = {type: "Point",coordinates: [pokemonFoundLongitude, pokemonFoundLatitude]};
                            savePokemonSighthing(pokemonSighting);
                        }
                    }
                });
        }

        function savePokemonSighthing(pokemonSighting) {
            pokemonSighting.location = location;
            // saving the data to the database
            pokemonSighting.save(function (err) {
                // on error
                if (err) {
                    logger.error("Error while saving pokmon sighting from source twitter ");
                }
                // on success
                else {
                    logger.info("Pokemon sighting data saved successfully from source twitter ");
                }
            });
        }
    }
};