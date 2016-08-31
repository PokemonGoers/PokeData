"use strict";

const pokemon = require('../stores/pokemon');

module.exports = {
    /**
     * @api {get} /api/pokemon/ GetAllPokemons
     * @apiVersion 0.0.1
     * @apiName GetAllPokemons
     * @apiDescription Get all pokemons.
     * @apiGroup Pokemon
     *
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {"message":"Success",
     *  "data": [{
     *          "maxHP":1071,
     *          "maxCP":951,
     *          "fleeRate":0.1,
     *          "classification":"Seed Pokèmon",
     *          "name":"Bulbasaur",
     *          "pokemonID":1,
     *          "gender":{ "abbreviation":"h", "maleRatio":7, "femaleRatio":1, "breedable":true },
     *          "previousEvolutions":[],
     *          "nextEvolutions":[{ "pokemonID":2, "name":"Ivysaur", "_id":"57c58dd4a9da492b16052d8d" }],
     *          "height":{ "maximum":"0.79m", "minimum":"0.61m" },
     *          "weight":{ "maximum":"7.76kg", "minimum":"6.04kg" },
     *          "specialAttacks":[{ "type":"Poison", "name":"Sludge Bomb", "damage":55, "_id":"57c58dd4a9da492b16052d8c" }],
     *          "fastAttacks":[{ "type":"Normal", "name":"Tackle", "damage":12, "_id":"57c58dd4a9da492b16052d88" }],
     *          "weakness":["fire","ice","flying","psychic"],
     *          "resistance":["water","electric","grass","fighting","fairy"],
     *          "types":["grass","poison"]
     * }] }
     *
     * @apiSuccessExample {json} No db-entries:
     * HTTP/1.1 200 OK
     * [
     * ]
     */
    getAll: function (req, res) {
        logger.info('GetAllPokemons');

        pokemon.getAll(function(success, pokemons) {
            logger.info(pokemons);
            res.status(200).json(pokemons);
        });
    },

    /**
     * @api {get} /api/pokemon/id/:id GetPokemonById
     * @apiVersion 0.0.1
     * @apiName GetPokemonById
     * @apiDescription Get pokemon by specific id
     * @apiGroup Pokemon
     * @apiParam {Integer{1-151}} id Pokemon ID
     *
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {"message":"Success",
     *  "data": [{
     *          "maxHP":1071,
     *          "maxCP":951,
     *          "fleeRate":0.1,
     *          "classification":"Seed Pokèmon",
     *          "name":"Bulbasaur",
     *          "pokemonID":1,
     *          "gender":{ "abbreviation":"h", "maleRatio":7, "femaleRatio":1, "breedable":true },
     *          "previousEvolutions":[],
     *          "nextEvolutions":[{ "pokemonID":2, "name":"Ivysaur", "_id":"57c58dd4a9da492b16052d8d" }],
     *          "height":{ "maximum":"0.79m", "minimum":"0.61m" },
     *          "weight":{ "maximum":"7.76kg", "minimum":"6.04kg" },
     *          "specialAttacks":[{ "type":"Poison", "name":"Sludge Bomb", "damage":55, "_id":"57c58dd4a9da492b16052d8c" }],
     *          "fastAttacks":[{ "type":"Normal", "name":"Tackle", "damage":12, "_id":"57c58dd4a9da492b16052d88" }],
     *          "weakness":["fire","ice","flying","psychic"],
     *          "resistance":["water","electric","grass","fighting","fairy"],
     *          "types":["grass","poison"]
     * }] }
     *
     * @apiSuccessExample {json} No db-entries:
     * HTTP/1.1 200 OK
     * [
     * ]
     */
    getById : function (req, res) {
        logger.info('Get Pokemon details of a particular pokemon by id');

        pokemon.getById(req.params.id, function(success, message) {
            if(success === 1)
                res.status(200).json({message: 'Success', data: message});
            else
                res.status(404).json({message: 'Failure. No pokemon details with this id exists!', data: message});
        });
   },
    /**
     * @api {get} /api/pokemon/gender/:gender GetPokemonByGender
     * @apiVersion 0.0.1
     * @apiName GetPokemonByGender
     * @apiDescription Get pokemon by specific gender
     * @apiGroup Pokemon
     * @apiParam {String{1}="m","f","g","h"} gender Gender of the pokemon
     *
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {"message":"Success",
     *  "data": [{
     *          "maxHP":1071,
     *          "maxCP":951,
     *          "fleeRate":0.1,
     *          "classification":"Seed Pokèmon",
     *          "name":"Bulbasaur",
     *          "pokemonID":1,
     *          "gender":{ "abbreviation":"h", "maleRatio":7, "femaleRatio":1, "breedable":true },
     *          "previousEvolutions":[],
     *          "nextEvolutions":[{ "pokemonID":2, "name":"Ivysaur", "_id":"57c58dd4a9da492b16052d8d" }],
     *          "height":{ "maximum":"0.79m", "minimum":"0.61m" },
     *          "weight":{ "maximum":"7.76kg", "minimum":"6.04kg" },
     *          "specialAttacks":[{ "type":"Poison", "name":"Sludge Bomb", "damage":55, "_id":"57c58dd4a9da492b16052d8c" }],
     *          "fastAttacks":[{ "type":"Normal", "name":"Tackle", "damage":12, "_id":"57c58dd4a9da492b16052d88" }],
     *          "weakness":["fire","ice","flying","psychic"],
     *          "resistance":["water","electric","grass","fighting","fairy"],
     *          "types":["grass","poison"]
     * }] }
     *
     * @apiSuccessExample {json} No db-entries:
     * HTTP/1.1 200 OK
     * [
     * ]
     */
    getByGender : function (req, res) {
        logger.info('Get Pokemon details by gender');

        pokemon.getByGender(req.params.gender, function(success, message) {
            if(success === 1)
                res.status(200).json({message: 'Success', data: message});
            else
                res.status(404).json({message: 'Failure. No pokemon details with this gender exists!', data: message});
        });
    },

    /**
     * @api {get} /api/pokemon/name/:name/ GetPokemonByName
     * @apiVersion 0.0.1
     * @apiName GetPokemonByName
     * @apiDescription Get pokemon by specific name
     * @apiGroup Pokemon
     * @apiParam {String} name Name of the pokemon
     *
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {"message":"Success",
     *  "data": [{
     *          "maxHP":1071,
     *          "maxCP":951,
     *          "fleeRate":0.1,
     *          "classification":"Seed Pokèmon",
     *          "name":"Bulbasaur",
     *          "pokemonID":1,
     *          "gender":{ "abbreviation":"h", "maleRatio":7, "femaleRatio":1, "breedable":true },
     *          "previousEvolutions":[],
     *          "nextEvolutions":[{ "pokemonID":2, "name":"Ivysaur", "_id":"57c58dd4a9da492b16052d8d" }],
     *          "height":{ "maximum":"0.79m", "minimum":"0.61m" },
     *          "weight":{ "maximum":"7.76kg", "minimum":"6.04kg" },
     *          "specialAttacks":[{ "type":"Poison", "name":"Sludge Bomb", "damage":55, "_id":"57c58dd4a9da492b16052d8c" }],
     *          "fastAttacks":[{ "type":"Normal", "name":"Tackle", "damage":12, "_id":"57c58dd4a9da492b16052d88" }],
     *          "weakness":["fire","ice","flying","psychic"],
     *          "resistance":["water","electric","grass","fighting","fairy"],
     *          "types":["grass","poison"]
     * }] }
     *
     * @apiSuccessExample {json} No db-entries:
     * HTTP/1.1 200 OK
     * [
     * ]
     */
    getByName : function (req, res) {
        logger.info('Get Pokemon details by name');

        pokemon.getByName(req.params.name, function(success, message) {
            if(success === 1)
                res.status(200).json({message: 'Success', data: message});
            else
                res.status(404).json({message: 'Failure. No pokemon details with this name exists!', data: {'name': req.params.name}});
        });
    },
    /**
     * @api {get} /api/pokemon/type/:type/ GetPokemonByType
     * @apiVersion 0.0.1
     * @apiName GetPokemonByType
     * @apiDescription Get pokemon by specific type
     * @apiGroup Pokemon
     * @apiParam {String} type Type of the pokemon
     *
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {"message":"Success",
     *  "data": [{
     *          "maxHP":1071,
     *          "maxCP":951,
     *          "fleeRate":0.1,
     *          "classification":"Seed Pokèmon",
     *          "name":"Bulbasaur",
     *          "pokemonID":1,
     *          "gender":{ "abbreviation":"h", "maleRatio":7, "femaleRatio":1, "breedable":true },
     *          "previousEvolutions":[],
     *          "nextEvolutions":[{ "pokemonID":2, "name":"Ivysaur", "_id":"57c58dd4a9da492b16052d8d" }],
     *          "height":{ "maximum":"0.79m", "minimum":"0.61m" },
     *          "weight":{ "maximum":"7.76kg", "minimum":"6.04kg" },
     *          "specialAttacks":[{ "type":"Poison", "name":"Sludge Bomb", "damage":55, "_id":"57c58dd4a9da492b16052d8c" }],
     *          "fastAttacks":[{ "type":"Normal", "name":"Tackle", "damage":12, "_id":"57c58dd4a9da492b16052d88" }],
     *          "weakness":["fire","ice","flying","psychic"],
     *          "resistance":["water","electric","grass","fighting","fairy"],
     *          "types":["grass","poison"]
     * }] }
     *
     * @apiSuccessExample {json} No db-entries:
     * HTTP/1.1 200 OK
     * [
     * ]
     */
    getByType : function (req, res) {
        logger.info('Get Pokemon details by type');

        pokemon.getByType(req.params.type, function(success, message) {
            if(success === 1)
                res.status(200).json({message: 'Success', data: message});
            else
                res.status(404).json({message: 'Failure. No pokemon details with this type exists!', data: {'type': req.params.type}});
        });
    },
    /**
     * @api {get} /api/pokemon/resistance/:resistance/ GetPokemonByResistance
     * @apiVersion 0.0.1
     * @apiName GetPokemonByResistance
     * @apiDescription Get pokemon by specific resistance
     * @apiGroup Pokemon
     * @apiParam {String} resistance Resistance factor of the pokemon
     *
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {"message":"Success",
     *  "data": [{
     *          "maxHP":1071,
     *          "maxCP":951,
     *          "fleeRate":0.1,
     *          "classification":"Seed Pokèmon",
     *          "name":"Bulbasaur",
     *          "pokemonID":1,
     *          "gender":{ "abbreviation":"h", "maleRatio":7, "femaleRatio":1, "breedable":true },
     *          "previousEvolutions":[],
     *          "nextEvolutions":[{ "pokemonID":2, "name":"Ivysaur", "_id":"57c58dd4a9da492b16052d8d" }],
     *          "height":{ "maximum":"0.79m", "minimum":"0.61m" },
     *          "weight":{ "maximum":"7.76kg", "minimum":"6.04kg" },
     *          "specialAttacks":[{ "type":"Poison", "name":"Sludge Bomb", "damage":55, "_id":"57c58dd4a9da492b16052d8c" }],
     *          "fastAttacks":[{ "type":"Normal", "name":"Tackle", "damage":12, "_id":"57c58dd4a9da492b16052d88" }],
     *          "weakness":["fire","ice","flying","psychic"],
     *          "resistance":["water","electric","grass","fighting","fairy"],
     *          "types":["grass","poison"]
     * }] }
     *
     * @apiSuccessExample {json} No db-entries:
     * HTTP/1.1 200 OK
     * [
     * ]
     */
    getByResistance : function (req, res) {
        logger.info('Get Pokemon details by resistance');

        pokemon.getByResistance(req.params.resistance, function(success, message) {
            if(success === 1)
                res.status(200).json({message: 'Success', data: message});
            else
                res.status(404).json({message: 'Failure.', data: message});
        });
    },
    /**
     * @api {get} /api/pokemon/weakness/:weakness/ GetPokemonByWeakness
     * @apiVersion 0.0.1
     * @apiName GetPokemonByWeakness
     * @apiDescription Get pokemon by specific weakness
     * @apiGroup Pokemon
     * @apiParam {String} weakness Weakness of the pokemon
     *
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {"message":"Success",
     *  "data": [{
     *          "maxHP":1071,
     *          "maxCP":951,
     *          "fleeRate":0.1,
     *          "classification":"Seed Pokèmon",
     *          "name":"Bulbasaur",
     *          "pokemonID":1,
     *          "gender":{ "abbreviation":"h", "maleRatio":7, "femaleRatio":1, "breedable":true },
     *          "previousEvolutions":[],
     *          "nextEvolutions":[{ "pokemonID":2, "name":"Ivysaur", "_id":"57c58dd4a9da492b16052d8d" }],
     *          "height":{ "maximum":"0.79m", "minimum":"0.61m" },
     *          "weight":{ "maximum":"7.76kg", "minimum":"6.04kg" },
     *          "specialAttacks":[{ "type":"Poison", "name":"Sludge Bomb", "damage":55, "_id":"57c58dd4a9da492b16052d8c" }],
     *          "fastAttacks":[{ "type":"Normal", "name":"Tackle", "damage":12, "_id":"57c58dd4a9da492b16052d88" }],
     *          "weakness":["fire","ice","flying","psychic"],
     *          "resistance":["water","electric","grass","fighting","fairy"],
     *          "types":["grass","poison"]
     * }] }
     *
     * @apiSuccessExample {json} No db-entries:
     * HTTP/1.1 200 OK
     * [
     * ]
     */
    getByWeakness : function (req, res) {
        logger.info('Get Pokemon details by weakness');

        pokemon.getByWeakness(req.params.weakness, function(success, message) {
            if(success === 1)
                res.status(200).json({message: 'Success', data: message});
            else
                res.status(404).json({message: 'Failure.', data: message});
        });
    },
    /**
     * @api {get} /api/pokemon/attack/:category/type/:type GetPokemonByAttackType
     * @apiVersion 0.0.1
     * @apiName GetPokemonByAttackType
     * @apiDescription Get pokemon by specific attack type
     * @apiGroup Pokemon
     * @apiParam {String="fast","special"} category Category of attack
     * @apiParam {String} type Type of the attack
     *
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {"message":"Success",
     *  "data": [{
     *          "maxHP":1071,
     *          "maxCP":951,
     *          "fleeRate":0.1,
     *          "classification":"Seed Pokèmon",
     *          "name":"Bulbasaur",
     *          "pokemonID":1,
     *          "gender":{ "abbreviation":"h", "maleRatio":7, "femaleRatio":1, "breedable":true },
     *          "previousEvolutions":[],
     *          "nextEvolutions":[{ "pokemonID":2, "name":"Ivysaur", "_id":"57c58dd4a9da492b16052d8d" }],
     *          "height":{ "maximum":"0.79m", "minimum":"0.61m" },
     *          "weight":{ "maximum":"7.76kg", "minimum":"6.04kg" },
     *          "specialAttacks":[{ "type":"Poison", "name":"Sludge Bomb", "damage":55, "_id":"57c58dd4a9da492b16052d8c" }],
     *          "fastAttacks":[{ "type":"Normal", "name":"Tackle", "damage":12, "_id":"57c58dd4a9da492b16052d88" }],
     *          "weakness":["fire","ice","flying","psychic"],
     *          "resistance":["water","electric","grass","fighting","fairy"],
     *          "types":["grass","poison"]
     * }] }
     *
     * @apiSuccessExample {json} No db-entries:
     * HTTP/1.1 200 OK
     * [
     * ]
     */
    getByAttackType : function (req, res) {
        logger.info('Get Pokemon details by attack type');

        let handler;

        if (req.params.category === 'fast') {
            handler = pokemon.getByFastAttackType.bind(pokemon);
        } else if (req.params.category === 'special') {
            handler = pokemon.getBySpecialAttackType.bind(pokemon);
        }

        handler(req.params.type, function(success, message) {
            if(success === 1)
                res.status(200).json({message: 'Success', data: message});
            else
                res.status(404).json({message: 'Failure.', data: message});
        });
    },
    /**
     * @api {get} /api/pokemon/attack/:category/name/:name GetPokemonByAttackName
     * @apiVersion 0.0.1
     * @apiName GetPokemonByAttackName
     * @apiDescription Get pokemon by specific attack name
     * @apiGroup Pokemon
     * @apiParam {String="fast","special"} category Category of attack
     * @apiParam {String} name Name of the attack
     *
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {"message":"Success",
     *  "data": [{
     *          "maxHP":1071,
     *          "maxCP":951,
     *          "fleeRate":0.1,
     *          "classification":"Seed Pokèmon",
     *          "name":"Bulbasaur",
     *          "pokemonID":1,
     *          "gender":{ "abbreviation":"h", "maleRatio":7, "femaleRatio":1, "breedable":true },
     *          "previousEvolutions":[],
     *          "nextEvolutions":[{ "pokemonID":2, "name":"Ivysaur", "_id":"57c58dd4a9da492b16052d8d" }],
     *          "height":{ "maximum":"0.79m", "minimum":"0.61m" },
     *          "weight":{ "maximum":"7.76kg", "minimum":"6.04kg" },
     *          "specialAttacks":[{ "type":"Poison", "name":"Sludge Bomb", "damage":55, "_id":"57c58dd4a9da492b16052d8c" }],
     *          "fastAttacks":[{ "type":"Normal", "name":"Tackle", "damage":12, "_id":"57c58dd4a9da492b16052d88" }],
     *          "weakness":["fire","ice","flying","psychic"],
     *          "resistance":["water","electric","grass","fighting","fairy"],
     *          "types":["grass","poison"]
     * }] }
     *
     * @apiSuccessExample {json} No db-entries:
     * HTTP/1.1 200 OK
     * [
     * ]
     */
    getByAttackName : function (req, res) {
        logger.info('Get Pokemon details by attack name');

        let handler;

        if (req.params.category === 'fast') {
            handler = pokemon.getByFastAttackName.bind(pokemon);
        } else if (req.params.category === 'special') {
            handler = pokemon.getBySpecialAttackName.bind(pokemon);
        }

        handler(req.params.name, function(success, message) {
            if(success === 1)
                res.status(200).json({message: 'Success', data: message});
            else
                res.status(404).json({message: 'Failure.', data: message});
        });
    },
    /**
     * @api {get} /api/pokemon/attack/:category/damage/:damage GetPokemonByAttackDamage
     * @apiVersion 0.0.1
     * @apiName GetPokemonByAttackDamage
     * @apiDescription Get pokemon by specific attack damage
     * @apiGroup Pokemon
     * @apiParam {String="fast","special"} category Category of attack
     * @apiParam {Integer} damage Damage value of the attack
     *
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {"message":"Success",
     *  "data": [{
     *          "maxHP":1071,
     *          "maxCP":951,
     *          "fleeRate":0.1,
     *          "classification":"Seed Pokèmon",
     *          "name":"Bulbasaur",
     *          "pokemonID":1,
     *          "gender":{ "abbreviation":"h", "maleRatio":7, "femaleRatio":1, "breedable":true },
     *          "previousEvolutions":[],
     *          "nextEvolutions":[{ "pokemonID":2, "name":"Ivysaur", "_id":"57c58dd4a9da492b16052d8d" }],
     *          "height":{ "maximum":"0.79m", "minimum":"0.61m" },
     *          "weight":{ "maximum":"7.76kg", "minimum":"6.04kg" },
     *          "specialAttacks":[{ "type":"Poison", "name":"Sludge Bomb", "damage":55, "_id":"57c58dd4a9da492b16052d8c" }],
     *          "fastAttacks":[{ "type":"Normal", "name":"Tackle", "damage":12, "_id":"57c58dd4a9da492b16052d88" }],
     *          "weakness":["fire","ice","flying","psychic"],
     *          "resistance":["water","electric","grass","fighting","fairy"],
     *          "types":["grass","poison"]
     * }] }
     *
     * @apiSuccessExample {json} No db-entries:
     * HTTP/1.1 200 OK
     * [
     * ]
     */
    getByAttackDamage : function (req, res) {
        logger.info('Get Pokemon details by attack damage');

        let handler;

        if (req.params.category === 'fast') {
            handler = pokemon.getByFastAttackDamage.bind(pokemon);
        } else if (req.params.category === 'special') {
            handler = pokemon.getBySpecialAttackDamage.bind(pokemon);
        }

        handler(req.params.damage, function(success, message) {
            if(success === 1)
                res.status(200).json({message: 'Success', data: message});
            else
                res.status(404).json({message: 'Failure.', data: message});
        });
    },
    /**
     * @api {get} /api/pokemon/evolution/:category/id/:id GetPokemonByEvolutionId
     * @apiVersion 0.0.1
     * @apiName GetPokemonByEvolutionId
     * @apiDescription Get pokemon by specific evolution ID
     * @apiGroup Pokemon
     * @apiParam {String="prev","next"} category Category of evolution
     * @apiParam {Integer{1-151}} id ID of the evolved Pokemon
     *
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {"message":"Success",
     *  "data": [{
     *          "maxHP":1071,
     *          "maxCP":951,
     *          "fleeRate":0.1,
     *          "classification":"Seed Pokèmon",
     *          "name":"Bulbasaur",
     *          "pokemonID":1,
     *          "gender":{ "abbreviation":"h", "maleRatio":7, "femaleRatio":1, "breedable":true },
     *          "previousEvolutions":[],
     *          "nextEvolutions":[{ "pokemonID":2, "name":"Ivysaur", "_id":"57c58dd4a9da492b16052d8d" }],
     *          "height":{ "maximum":"0.79m", "minimum":"0.61m" },
     *          "weight":{ "maximum":"7.76kg", "minimum":"6.04kg" },
     *          "specialAttacks":[{ "type":"Poison", "name":"Sludge Bomb", "damage":55, "_id":"57c58dd4a9da492b16052d8c" }],
     *          "fastAttacks":[{ "type":"Normal", "name":"Tackle", "damage":12, "_id":"57c58dd4a9da492b16052d88" }],
     *          "weakness":["fire","ice","flying","psychic"],
     *          "resistance":["water","electric","grass","fighting","fairy"],
     *          "types":["grass","poison"]
     * }] }
     *
     * @apiSuccessExample {json} No db-entries:
     * HTTP/1.1 200 OK
     * [
     * ]
     */
    getByEvolutionId: function (req, res) {
        logger.info('Get Pokemon details by evolution id');

        let handler;

        if (req.params.category === 'prev') {
            handler = pokemon.getByPrevEvolutionId.bind(pokemon);
        } else if (req.params.category === 'next') {
            handler = pokemon.getByNextEvolutionId.bind(pokemon);
        }

        handler(req.params.id, function(success, message) {
            if(success === 1)
                res.status(200).json({message: 'Success', data: message});
            else
                res.status(404).json({message: 'Failure.', data: message});
        });
    },
    /**
     * @api {get} /api/pokemon/evolution/:category/name/:name GetPokemonByEvolutionName
     * @apiVersion 0.0.1
     * @apiName GetPokemonByEvolutionName
     * @apiDescription Get pokemon by specific evolution name
     * @apiGroup Pokemon
     * @apiParam {String="prev","next"} category Category of evolution
     * @apiParam {String} name Name of the evolved Pokemon
     *
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {"message":"Success",
     *  "data": [{
     *          "maxHP":1071,
     *          "maxCP":951,
     *          "fleeRate":0.1,
     *          "classification":"Seed Pokèmon",
     *          "name":"Bulbasaur",
     *          "pokemonID":1,
     *          "gender":{ "abbreviation":"h", "maleRatio":7, "femaleRatio":1, "breedable":true },
     *          "previousEvolutions":[],
     *          "nextEvolutions":[{ "pokemonID":2, "name":"Ivysaur", "_id":"57c58dd4a9da492b16052d8d" }],
     *          "height":{ "maximum":"0.79m", "minimum":"0.61m" },
     *          "weight":{ "maximum":"7.76kg", "minimum":"6.04kg" },
     *          "specialAttacks":[{ "type":"Poison", "name":"Sludge Bomb", "damage":55, "_id":"57c58dd4a9da492b16052d8c" }],
     *          "fastAttacks":[{ "type":"Normal", "name":"Tackle", "damage":12, "_id":"57c58dd4a9da492b16052d88" }],
     *          "weakness":["fire","ice","flying","psychic"],
     *          "resistance":["water","electric","grass","fighting","fairy"],
     *          "types":["grass","poison"]
     * }] }
     *
     * @apiSuccessExample {json} No db-entries:
     * HTTP/1.1 200 OK
     * [
     * ]
     */
    getByEvolutionName: function (req, res) {
        logger.info('Get Pokemon details by evolution name');

        let handler;

        if (req.params.category === 'prev') {
            handler = pokemon.getByPrevEvolutionName.bind(pokemon);
        } else if (req.params.category === 'next') {
            handler = pokemon.getByNextEvolutionName.bind(pokemon);
        }

        handler(req.params.name, function(success, message) {
            if(success === 1)
                res.status(200).json({message: 'Success', data: message});
            else
                res.status(404).json({message: 'Failure.', data: message});
        });
    }
};