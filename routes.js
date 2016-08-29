module.exports = function (app, router) {
    const api = require(__appbase + 'api/pokemon');

    //routes for all pokemon sightings
    router.get('/pokemon/sighting/', api.getAllSightings);

    //routes for pokemon sightings by id
    router.get('/pokemon/sighting/id/:id', api.getSightingsById);

    //routes for pokemon sightings at particular coordinates
    router.get('/pokemon/sighting/coordinates/:longitude,:latitude', api.getPokemonAtCoordinates);

    //routes for pokemon sightings between set of coordinates
    router.get('/pokemon/sighting/bycoordinates/:startLongitude,:startLatitude,:endLongitude,:endLatitude', api.getPokemonBetweenCoordinates);

    // routes for pokemon sightings from a particular source #
    router.get('/pokemon/sighting/source/:source', api.getPokemonFromSource);


    //route for getting all pokemon details
    router.get('/pokemon/', api.getAllPokemons);

    //route for getting pokemon details based on particular id
    router.get('/pokemon/id/:id', api.getPokemonById);

    //route for getting pokemon details based on gender
    router.get('/pokemon/gender/:gender', api.getPokemonByGender);

    //route for getting pokemon details based on name
    router.get('/pokemon/name/:name', api.getPokemonByName);

    //route for getting pokemon details based on resistance
    router.get('/pokemon/resistance/:resistance', api.getPokemonByResistance);

    //route for getting pokemon details based on weakness
    router.get('/pokemon/weakness/:weakness', api.getPokemonByWeakness);
};
