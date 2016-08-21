require(__dirname + '/../' + 'constants');

// listener for rare pokemons
var rarePokemonListener = require(__base + 'app/controllers/filler/rarePokemon');
rarePokemonListener.fill(function () {
    process.exit();
});