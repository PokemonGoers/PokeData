var Pokemon = require(__appbase + 'models/pokemon');

module.exports = {

    add: function (data, callback) {
        var pokemon = new Pokemon();

        for (var key in data) {
                pokemon[key] = data[key];
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
    }
};