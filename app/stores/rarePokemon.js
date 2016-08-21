"use strict";
const rarePokemon = require(__appbase + 'models/rarePokemon');

module.exports = {
    /*
     * inserting the rare pokemon details
     */
    add: function (data, callback) {
        var rarePokemons = new rarePokemon();

        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                if( key == 'coords'){
                    let coordsArr = data[key].split(",");
                    rarePokemons['latitude'] = parseFloat(coordsArr[0]);
                    rarePokemons['longitude'] = parseFloat(coordsArr[1]);
                }
                else
                    rarePokemons[key] = data[key];
            }
        }
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