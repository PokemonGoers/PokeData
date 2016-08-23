module.exports = function (app, router) {

    //routes for pokemon details
    var pokemonController = require(__appbase + 'controllers/pokemon');
    router.get('/pokemons', pokemonController.getAll);

};
