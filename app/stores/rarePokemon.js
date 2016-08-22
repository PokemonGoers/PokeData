"use strict";
const rarePokemon = require(__appbase + 'models/rarePokemon');

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
                    case 'coords': let coordsArr = data[key].split(",");
                                   rarePokemons['latitude'] = parseFloat(coordsArr[0]);
                                   rarePokemons['longitude'] = parseFloat(coordsArr[1]);
                                   break;

                    case 'until' : rarePokemons['seen_until'] = data[key];
                                   break;

                    default      : rarePokemons[key] = data[key];
                }
            }
        }
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