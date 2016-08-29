module.exports = function (app, router) {
    const api = require(__appbase + 'api/pokemon');

    //route for all pokemon sightings
    router.get('/pokemon/sighting/', api.getAllSightings);

    //route for pokemon sightings by specific id
    router.get('/pokemon/sighting/id/:id', api.getSightingsById);

    //route for pokemon sightings at particular coordinates
    router.get('/pokemon/sighting/coordinates/:longitude,:latitude', api.getPokemonAtCoordinates);

    //route for pokemon sightings between set of coordinates
    router.get('/pokemon/sighting/coordinates/from/:startLongitude,:startLatitude/to/:endLongitude,:endLatitude', api.getPokemonBetweenCoordinates);

    //route for pokemon sightings by specific source
    router.get('/pokemon/sighting/source/:source', api.getPokemonFromSource);


    //route for getting all pokemon details
    router.get('/pokemon/', api.getAllPokemons);

    //route for getting pokemon details by specific id
    router.get('/pokemon/id/:id', api.getPokemonById);

    //route for getting pokemon details by specific gender
    router.get('/pokemon/gender/:gender', api.getPokemonByGender);

    //route for getting pokemon details by specific name
    router.get('/pokemon/name/:name', api.getPokemonByName);

    //route for getting pokemon details by specific resistance
    router.get('/pokemon/resistance/:resistance', api.getPokemonByResistance);

    //route for getting pokemon details by specific weakness
    router.get('/pokemon/weakness/:weakness', api.getPokemonByWeakness);
};
