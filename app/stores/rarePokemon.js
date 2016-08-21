var rarePokemon = require(__appbase + 'models/rarePokemon');

module.exports = {
    /*
     * inserting the rare pokemon details
     */
    add: function (data, callback) {
        var rarePokemons = new rarePokemon();

        for (var key in data) {
            if (data.hasOwnProperty(key)) {
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