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

    //route for pokemon sightings within a specific time range
    router.get('/pokemon/sighting/ts/:ts/range/:range', sighting.getByTimeRange);
    router.get('/pokemon/sighting/ts/:ts/', sighting.getByTimeRange);

    //route for getting pokemon sightings by specified query parameters
    router.get('/pokemon/sighting/search', sighting.search);

    //route for getting all pokemon details
    router.get('/pokemon/', pokemon.getAll);

    //route for getting pokemon details by specific id
    router.get('/pokemon/id/:id', pokemon.getById);

    //route for getting pokemon icon by specific id
    router.get('/pokemon/id/:id/icon', pokemon.getIconById);

    //route for getting pokemon details by specific gender
    router.get('/pokemon/gender/:gender', pokemon.getByGender);

    //route for getting pokemon details by specific name
    router.get('/pokemon/name/:name', pokemon.getByName);

    //route for getting pokemon details by description
    router.get('/pokemon/description/:description', pokemon.getByDescription);

    //route for getting pokemon details by specific type
    router.get('/pokemon/type/:type', pokemon.getByType);

    //route for getting pokemon details by specific resistance
    router.get('/pokemon/resistance/:resistance', pokemon.getByResistance);

    //route for getting pokemon details by specific weakness
    router.get('/pokemon/weakness/:weakness', pokemon.getByWeakness);

    //route for getting pokemon details by specific weakness
    router.get('/pokemon/attack/:category(fast|special)/type/:type', pokemon.getByAttackType);

    //route for getting pokemon details by specific weakness
    router.get('/pokemon/attack/:category(fast|special)/name/:name', pokemon.getByAttackName);

    //route for getting pokemon details by specific weakness
    router.get('/pokemon/attack/:category(fast|special)/damage/:damage', pokemon.getByAttackDamage);

    //route for getting pokemon details by specific weakness
    router.get('/pokemon/evolution/:category(prev|next)/id/:id', pokemon.getByEvolutionId);

    //route for getting pokemon details by specific weakness
    router.get('/pokemon/evolution/:category(prev|next)/name/:name', pokemon.getByEvolutionName);

    //route for getting pokemon details by specified query parameters
    router.get('/pokemon/search', pokemon.search);
};
