"use strict";
const rarePokemon = require(__appbase + 'models/pokemonSighting'),
      config      = require(__base+'config');

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
                                    let temp = data[key].split('T'),
                                        date = temp[0],
                                        temp1 = temp[1].split('.'),
                                        time = temp1[0],
                                        timeArr = time.split(':'),
                                        spawnTimeInseconds = (Number(timeArr[0]*60*60) + Number(timeArr[1]*60) + Number(timeArr[2]) )- config.pokemonSpawnTime,
                                        tempTime = Number(spawnTimeInseconds),
                                        h = Math.floor(tempTime / 3600),
                                        m = Math.floor(tempTime % 3600 / 60),
                                        s = Math.floor(tempTime % 3600 % 60),
                                        spawnTime = (h < 10 ? "0" + h : h) + ":" + (m < 10 ? "0" + m : m) + ":" + (s  < 10 ? "0" + s : s),
                                        spawnTimeStamp = date + 'T' + spawnTime +'.' + temp1[1];
                                    rarePokemons['appearedOn'] = spawnTimeStamp;
                                    break;

                }
            }
        }

        rarePokemons['source'] = config.pokemonDataSources.pokesniper;
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