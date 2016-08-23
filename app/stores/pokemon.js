var Pokemon = require(__appbase + 'models/pokemon');

module.exports = {
    /*
     * inserting the pokemon details
     */
    add: function (data, callback) {
        var pokemon = new Pokemon();

        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                pokemon[key] = data[key];
            }
        }
        pokemon.save(function (err) {
            // on error
            if (err) {
                callback(0, err);
            }
            // on success
            else {
                callback(1, pokemon);
            }
        });
    },
    /*
     * fetching the particular pokemon details
     */
    get: function (data, callback) {
        Pokemon.find(data, function (err, obj) {
            if (obj.length === 0) {// already existing data and return 0 for indicating
                callback(0, data);
            } else { // new data and return 1 for indicating
                callback(1, obj);
            }
        });
    },

    /*
     * fetching all the pokemon details
     */
    getAll: function (callback) {
        Pokemon.find(function (err, pokemons) {
            if (err)
                callback(false,err);
            else
                callback(true,pokemons);
        });
    },

    /*
     * searching the pokemon details by Id
     */
    getById: function (id, callback) {
        this.get(id, function (success, message) {
            if (success == 1) {// on successfully finding previous data
                callback(success, message[0]);
            } else {//  no previous entry for the particular data exists
                callback(success, message);
            }
        });
    }
};