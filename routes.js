var config = require(__base + 'config'),
    cache = require('apicache').middleware;

module.exports = function (app, router) {
    const pokemon = require(__appbase + 'api/pokemon'),
        sighting = require(__appbase + 'api/sighting'),
        database = require(__appbase + 'services/database');

    //route for all pokemon sightings
    router.get('/pokemon/sighting/', cache('1 minutes'), sighting.getAll);

    //route for pokemon sightings by specific id
    router.get('/pokemon/sighting/id/:id', cache('5 minutes'), sighting.getById);

    //route for pokemon sightings at particular coordinates
    router.get('/pokemon/sighting/coordinates/:longitude,:latitude', cache('5 minutes'), sighting.getAtCoordinates);

    //route for pokemon sightings between set of coordinates
    router.get('/pokemon/sighting/coordinates/from/:startLongitude,:startLatitude/to/:endLongitude,:endLatitude', cache('5 minutes'), sighting.getBetweenCoordinates);

    //route for pokemon sightings by specific source
    router.get('/pokemon/sighting/source/:source', cache('5 minutes'), sighting.getBySource);

    //route for pokemon sightings within a specific time range
    router.get('/pokemon/sighting/ts/:ts/range/:range', cache('1 minutes'), sighting.getByTimeRange);
    router.get('/pokemon/sighting/ts/:ts/', cache('1 minutes'), sighting.getByTimeRange);

    //route for getting pokemon sightings by specified query parameters
    router.get('/pokemon/sighting/search', cache('5 minutes'), sighting.search);

    //route for getting all pokemon details
    router.get('/pokemon/', cache('60 minutes'), pokemon.getAll);

    //route for getting pokemon details by specific id
    router.get('/pokemon/id/:id', cache('60 minutes'), pokemon.getById);

    //route for getting pokemon icon by specific id
    router.get('/pokemon/id/:id/icon/gif', cache('60 minutes'), pokemon.getGifIconById);

    //route for getting pokemon icon by specific id
    router.get('/pokemon/id/:id/icon/png', cache('60 minutes'), pokemon.getPngIconById);

    //route for getting pokemon icon by specific id
    router.get('/pokemon/id/:id/icon/svg', cache('60 minutes'), pokemon.getSvgIconById);

    //route for getting pokemon details by specific gender
    router.get('/pokemon/gender/:gender', cache('60 minutes'), pokemon.getByGender);

    //route for getting pokemon details by specific name
    router.get('/pokemon/name/:name', cache('60 minutes'), pokemon.getByName);

    //route for getting pokemon details by description
    router.get('/pokemon/description/:description', cache('60 minutes'), pokemon.getByDescription);

    //route for getting pokemon details by specific type
    router.get('/pokemon/type/:type', cache('60 minutes'), pokemon.getByType);

    //route for getting pokemon details by specific resistance
    router.get('/pokemon/resistance/:resistance', cache('60 minutes'), pokemon.getByResistance);

    //route for getting pokemon details by specific weakness
    router.get('/pokemon/weakness/:weakness', cache('60 minutes'), pokemon.getByWeakness);

    //route for getting pokemon details by specific weakness
    router.get('/pokemon/attack/:category(fast|special)/type/:type', cache('60 minutes'), pokemon.getByAttackType);

    //route for getting pokemon details by specific weakness
    router.get('/pokemon/attack/:category(fast|special)/name/:name', cache('60 minutes'), pokemon.getByAttackName);

    //route for getting pokemon details by specific weakness
    router.get('/pokemon/attack/:category(fast|special)/damage/:damage', cache('60 minutes'), pokemon.getByAttackDamage);

    //route for getting pokemon details by specific weakness
    router.get('/pokemon/evolution/:category(prev|next)/id/:id', cache('60 minutes'), pokemon.getByEvolutionId);

    //route for getting pokemon details by specific weakness
    router.get('/pokemon/evolution/:category(prev|next)/name/:name', cache('60 minutes'), pokemon.getByEvolutionName);

    //route for getting pokemon details by specified query parameters
    router.get('/pokemon/search', cache('60 minutes'), pokemon.search);

    // route for getting sentiments about a given pokemon
    router.get('/pokemon/:pokemonNumber/sentiments', function (req, resp) {
        pokemon.sentiments(req, resp, database.getMongoDbUrl());
    });

    // route for getting sentiments about a given pokemon at a given location
    router.get('/pokemon/:pokemonNumber/sentiments/:lat/:lng', function (req, resp) {
        pokemon.sentiments(req, resp, database.getMongoDbUrl());
    })
};
