"use strict";

let fs = require('fs');
const basicPokemonDetail = require(__appbase + '/models/BasicPokemonDetail.js'),
    pokemonListPath = require(__resourcebase + '/pokemonlist.json');

module.exports = {

    add: function (data) {
        var basicPokemonDetail = new basicPokemonDetail();

        for (var entry in data) {
            if(data.hasOwnProperty(entry)) {
                basicPokemonDetail[entry] = data[entry];
            }
        }

        basicPokemonDetail.save(function(err) {
            if(err) {
                callback(0, err);
            } else {
                callback(1, basicPokemonDetail);
            }
        });
    }
};
