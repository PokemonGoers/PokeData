"use strict";

const rarePokemonStore = require(__appbase + 'stores/rarePokemon'),
    pokemonStore = require(__appbase + 'stores/pokemon'),
    async = require('async'),
    common = require(__base + 'app/services/common'),
    config = require(__base+'config');

module.exports = {
    /*
     * for inserting rarePokemon data to MongoDB
     */
    insertToDb: function () {
        // url of fetching the rarepokemons from pokesniper api
        const url = config.pokesniper.url;

        // for getting raraPokemons data from pokesnipers.com through an api request
        let rarePokemons = common.getHttpRequestData(url, function(rarePokemons){
            module.exports.insert(rarePokemons.results);
        });

        // recursively calling the function for continuius listening
        setTimeout(function(){
            module.exports.insertToDb();
        },  config.pokesniper.listeningInterval);
    },


    /*
     * inserting the read data into MongoDB
     */
    addRarePokemon : function (rarePokemon) {
        rarePokemonStore.add(rarePokemon, function (success, data) {
            if (success === 1) {
                logger.success('Success: ' + data);
            } else {
                logger.error('Error:' + data);
            }
        });
    },

/*
 * inserting the read data into MongoDB
 */
    insert : function (rarePokemons) {
        let length = 0,
            pokemonName;

        async.forEach(rarePokemons, function(rarePokemon){
            length++;
            pokemonName = (rarePokemon.name);
            // extracting pokemon id from the names
            pokemonStore.getByName(pokemonName, function (success, data) {
                if (success === 1) {
                    rarePokemon['id'] = data[0]['pokemonId'];
                    module.exports.addRarePokemon(rarePokemon);
                } else {
                    logger.error('Error: no master data for the pokemon ' + pokemonName);
                }
            });
        });

        logger.info('\n length',length);
    }
};
