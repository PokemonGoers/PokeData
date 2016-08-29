module.exports = function (app, router) {
    const pokemon = require(__appbase + 'api/pokemon'),
        sighting = require(__appbase + 'api/sighting');

    //route for all pokemon sightings
    router.get('/pokemon/sighting/', sighting.getAll);

    //route for pokemon sightings by specific id
    router.get('/pokemon/sighting/id/:id', sighting.getById);

    //route for pokemon sightings at particular coordinates
    router.get('/pokemon/sighting/coordinates/:longitude,:latitude', sighting.getAtCoordinates);

    //route for pokemon sightings between set of coordinates
    router.get('/pokemon/sighting/coordinates/from/:startLongitude,:startLatitude/to/:endLongitude,:endLatitude', sighting.getBetweenCoordinates);

    //route for pokemon sightings by specific source
    router.get('/pokemon/sighting/source/:source', sighting.getBySource);


    //route for getting all pokemon details
    router.get('/pokemon/', pokemon.getAll);

    //route for getting pokemon details by specific id
    router.get('/pokemon/id/:id', pokemon.getById);

    //route for getting pokemon details by specific gender
    router.get('/pokemon/gender/:gender', pokemon.getByGender);

    //route for getting pokemon details by specific name
    router.get('/pokemon/name/:name', pokemon.getByName);

    //route for getting pokemon details by specific type
    router.get('/pokemon/type/:type', pokemon.getByType);

    //route for getting pokemon details by specific resistance
    router.get('/pokemon/resistance/:resistance', pokemon.getByResistance);

    //route for getting pokemon details by specific weakness
    router.get('/pokemon/weakness/:weakness', pokemon.getByWeakness);
};
