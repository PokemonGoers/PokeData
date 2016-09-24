"use strict";

const pokemon = require('../stores/pokemon');
const hashPokemonGo = require('hashpokemongo');

module.exports = {
    /**
     * @apiDefine NoRecords
     * @apiSuccessExample {json} No records
     * HTTP/1.1 200 OK
     * {"message":"Success",
     *  "data": []
     * }
     *
     */

    /**
     * @apiDefine SamplePokemon
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {"message":"Success",
     *  "data": [{
     *          "maxHP":1071,
     *          "maxCP":951,
     *          "fleeRate":0.1,
     *          "classification":"Seed Pokèmon",
     *          "name":"Bulbasaur",
     *          "pokemonId":1,
     *          "gender":{ "abbreviation":"h", "maleRatio":7, "femaleRatio":1, "breedable":true },
     *          "previousEvolutions":[],
     *          "nextEvolutions":[{ "pokemonId":2, "name":"Ivysaur", "_id":"57c58dd4a9da492b16052d8d" }],
     *          "height":{ "maximum":"0.79m", "minimum":"0.61m" },
     *          "weight":{ "maximum":"7.76kg", "minimum":"6.04kg" },
     *          "specialAttacks":[{ "type":"Poison", "name":"Sludge Bomb", "damage":55, "_id":"57c58dd4a9da492b16052d8c" }],
     *          "fastAttacks":[{ "type":"Normal", "name":"Tackle", "damage":12, "_id":"57c58dd4a9da492b16052d88" }],
     *          "weakness":["fire","ice","flying","psychic"],
     *          "resistance":["water","electric","grass","fighting","fairy"],
     *          "types":["grass","poison"]
     * }] }
     *
     */

    /**
     * @apiDefine PokemonIconResponse
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     */


    /**
     * @api {get} /api/pokemon/ GetAllPokemons
     * @apiVersion 0.0.1
     * @apiName GetAllPokemons
     * @apiDescription Get all pokemons.
     * @apiGroup Pokemon
     *
     * @apiUse SamplePokemon
     * @apiUse NoRecords
     *
     */
    getAll: function (req, res) {
        logger.info('GetAllPokemons');

        pokemon.getAll(function (success, pokemons) {
            if (success === 1) {
                res.status(200).json({message: 'Success', data: pokemons});
            } else {
                res.status(404).json({message: 'Failure. No pokemon details found!', data: pokemons});
            }
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
     * @apiUse SamplePokemon
     * @apiUse NoRecords
     *
     */
    getById: function (req, res) {
        logger.info('Get Pokemon details of a particular pokemon by id');

        pokemon.getById(req.params.id, function (success, message) {
            if (success === 1)
                res.status(200).json({message: 'Success', data: message});
            else
                res.status(404).json({message: 'Failure. No pokemon details with this id exists!', data: message});
        });
    },

   /**
     * @api {get} /api/pokemon/id/:id/icon/gif GetGifIconById
     * @apiVersion 0.0.1
     * @apiName GetGifIconById
     * @apiDescription Get gif pokemon icon by specific id
     * @apiGroup Pokemon
     * @apiParam {Integer{1-151}} id Pokemon ID
     *
     * @apiUse PokemonIconResponse
     * @apiUse NoRecords
     * 
     */
    getGifIconById: function(req, res) {
        logger.info('Get Pokemon icon of particular pokemon by id');

        pokemon.getIconById(req.params.id, function(success, message) {
            if(success === 1) {
                res.writeHead(200, {'Content-Type': message[0].iconGif.contentType });
                res.end(message[0].iconGif.data, 'binary');
            } else {
                res.status(404).json({message: 'Failure. No pokemon icon with this id exists!'});
            }
        });
    },
    /**
     * @api {get} /api/pokemon/id/:id/icon/png GetPngIconById
     * @apiVersion 0.0.1
     * @apiName GetPngIconById
     * @apiDescription Get pokemon icon by specific id
     * @apiGroup Pokemon
     * @apiParam {Integer{1-151}} id Pokemon ID
     *
     * @apiUse PokemonIconResponse
     * @apiUse NoRecords
     * 
     */
    getPngIconById: function(req, res) {
        logger.info('Get Pokemon icon of particular pokemon by id');

        pokemon.getIconById(req.params.id, function(success, message) {
            if(success === 1) {
                res.writeHead(200, {'Content-Type': message[0].iconPng.contentType });
                res.end(message[0].iconPng.data, 'binary');
            } else {
                res.status(404).json({message: 'Failure. No pokemon icon with this id exists!'});
            }
        });
    },
    /**
     * @api {get} /api/pokemon/id/:id/icon/svg GetSvgIconById
     * @apiVersion 0.0.1
     * @apiName GetSvgIconById
     * @apiDescription Get pokemon icon by specific id
     * @apiGroup Pokemon
     * @apiParam {Integer{1-151}} id Pokemon ID
     *
     * @apiUse PokemonIconResponse
     * @apiUse NoRecords
     *
     */
    getSvgIconById: function(req, res) {
        logger.info('Get Pokemon icon of particular pokemon by id');

        pokemon.getIconById(req.params.id, function(success, message) {
            if(success === 1) {
                res.writeHead(200, {'Content-Type': message[0].iconSvg.contentType });
                res.end(message[0].iconSvg.data, 'binary');
            } else {
                res.status(404).json({message: 'Failure. No pokemon icon with this id exists!'});
            }
        });
    },
    /**
     * @api {get} /api/pokemon/gender/:gender GetPokemonByGender
     * @apiVersion 0.0.1
     * @apiName GetPokemonByGender
     * @apiDescription Get pokemon by specific gender
     * @apiGroup Pokemon
     * @apiParam {String{1}=m,f,g,h} gender Gender of the pokemon
     *
     * @apiUse SamplePokemon
     * @apiUse NoRecords
     *
     */
    getByGender: function (req, res) {
        logger.info('Get Pokemon details by gender');

        pokemon.getByGender(req.params.gender, function (success, message) {
            if (success === 1)
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
     * @apiUse SamplePokemon
     * @apiUse NoRecords
     *
     */
    getByName: function (req, res) {
        logger.info('Get Pokemon details by name');

        pokemon.getByName(req.params.name, function (success, message) {
            if (success === 1)
                res.status(200).json({message: 'Success', data: message});
            else
                res.status(404).json({
                    message: 'Failure. No pokemon details with this name exists!',
                    data: {'name': req.params.name}
                });
        });
    },

    /**
     * @api {get} /api/pokemon/description/:description/ GetPokemonByDescription
     * @apiVersion 0.0.1
     * @apiName GetPokemonByDescription
     * @apiDescription Get pokemon by specific description
     * @apiGroup Pokemon
     * @apiParam {String} description Description of the pokemon
     *
     * @apiUse SamplePokemon
     * @apiUse NoRecords
     *
     */
    getByDescription: function (req, res) {
        logger.info('Get Pokemon description');
        pokemon.getByDescription(req.params.description, function (success, message) {
            if (success === 1)
                res.status(200).json({message: 'Success', data: message});
            else
                res.status(404).json({
                    message: 'Failure. No pokemon description of that kind exists!',
                    data: {'description': req.params.description}
                });
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
     * @apiUse SamplePokemon
     * @apiUse NoRecords
     *
     */
    getByType: function (req, res) {
        logger.info('Get Pokemon details by type');

        pokemon.getByType(req.params.type, function (success, message) {
            if (success === 1)
                res.status(200).json({message: 'Success', data: message});
            else
                res.status(404).json({
                    message: 'Failure. No pokemon details with this type exists!',
                    data: {'type': req.params.type}
                });
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
     * @apiUse SamplePokemon
     * @apiUse NoRecords
     *
     */
    getByResistance: function (req, res) {
        logger.info('Get Pokemon details by resistance');

        pokemon.getByResistance(req.params.resistance, function (success, message) {
            if (success === 1)
                res.status(200).json({message: 'Success', data: message});
            else
                res.status(404).json({message: 'Failure', data: message});
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
     * @apiUse SamplePokemon
     * @apiUse NoRecords
     *
     */
    getByWeakness: function (req, res) {
        logger.info('Get Pokemon details by weakness');

        pokemon.getByWeakness(req.params.weakness, function (success, message) {
            if (success === 1)
                res.status(200).json({message: 'Success', data: message});
            else
                res.status(404).json({message: 'Failure', data: message});
        });
    },
    /**
     * @api {get} /api/pokemon/attack/:category/type/:type GetPokemonByAttackType
     * @apiVersion 0.0.1
     * @apiName GetPokemonByAttackType
     * @apiDescription Get pokemon by specific attack type
     * @apiGroup Pokemon
     * @apiParam {String=fast,special} category Category of attack
     * @apiParam {String} type Type of the attack
     *
     * @apiUse SamplePokemon
     * @apiUse NoRecords
     *
     */
    getByAttackType: function (req, res) {
        logger.info('Get Pokemon details by attack type');

        let handler;

        if (req.params.category === 'fast') {
            handler = pokemon.getByFastAttackType.bind(pokemon);
        } else if (req.params.category === 'special') {
            handler = pokemon.getBySpecialAttackType.bind(pokemon);
        }

        handler(req.params.type, function (success, message) {
            if (success === 1)
                res.status(200).json({message: 'Success', data: message});
            else
                res.status(404).json({message: 'Failure', data: message});
        });
    },
    /**
     * @api {get} /api/pokemon/attack/:category/name/:name GetPokemonByAttackName
     * @apiVersion 0.0.1
     * @apiName GetPokemonByAttackName
     * @apiDescription Get pokemon by specific attack name
     * @apiGroup Pokemon
     * @apiParam {String=fast,special} category Category of attack
     * @apiParam {String} name Name of the attack
     *
     * @apiUse SamplePokemon
     * @apiUse NoRecords
     *
     */
    getByAttackName: function (req, res) {
        logger.info('Get Pokemon details by attack name');

        let handler;

        if (req.params.category === 'fast') {
            handler = pokemon.getByFastAttackName.bind(pokemon);
        } else if (req.params.category === 'special') {
            handler = pokemon.getBySpecialAttackName.bind(pokemon);
        }

        handler(req.params.name, function (success, message) {
            if (success === 1)
                res.status(200).json({message: 'Success', data: message});
            else
                res.status(404).json({message: 'Failure', data: message});
        });
    },
    /**
     * @api {get} /api/pokemon/attack/:category/damage/:damage GetPokemonByAttackDamage
     * @apiVersion 0.0.1
     * @apiName GetPokemonByAttackDamage
     * @apiDescription Get pokemon by specific attack damage
     * @apiGroup Pokemon
     * @apiParam {String=fast,special} category Category of attack
     * @apiParam {Integer} damage Damage value of the attack
     *
     * @apiUse SamplePokemon
     * @apiUse NoRecords
     *
     */
    getByAttackDamage: function (req, res) {
        logger.info('Get Pokemon details by attack damage');

        let handler;

        if (req.params.category === 'fast') {
            handler = pokemon.getByFastAttackDamage.bind(pokemon);
        } else if (req.params.category === 'special') {
            handler = pokemon.getBySpecialAttackDamage.bind(pokemon);
        }

        handler(req.params.damage, function (success, message) {
            if (success === 1)
                res.status(200).json({message: 'Success', data: message});
            else
                res.status(404).json({message: 'Failure', data: message});
        });
    },
    /**
     * @api {get} /api/pokemon/evolution/:category/id/:id GetPokemonByEvolutionId
     * @apiVersion 0.0.1
     * @apiName GetPokemonByEvolutionId
     * @apiDescription Get pokemon by specific evolution ID
     * @apiGroup Pokemon
     * @apiParam {String=prev,next} category Category of evolution
     * @apiParam {Integer{1-151}} id ID of the evolved Pokemon
     *
     * @apiUse SamplePokemon
     * @apiUse NoRecords
     *
     */
    getByEvolutionId: function (req, res) {
        logger.info('Get Pokemon details by evolution id');

        let handler;

        if (req.params.category === 'prev') {
            handler = pokemon.getByPrevEvolutionId.bind(pokemon);
        } else if (req.params.category === 'next') {
            handler = pokemon.getByNextEvolutionId.bind(pokemon);
        }

        handler(req.params.id, function (success, message) {
            if (success === 1)
                res.status(200).json({message: 'Success', data: message});
            else
                res.status(404).json({message: 'Failure', data: message});
        });
    },
    /**
     * @api {get} /api/pokemon/evolution/:category/name/:name GetPokemonByEvolutionName
     * @apiVersion 0.0.1
     * @apiName GetPokemonByEvolutionName
     * @apiDescription Get pokemon by specific evolution name
     * @apiGroup Pokemon
     * @apiParam {String=prev,next} category Category of evolution
     * @apiParam {String} name Name of the evolved Pokemon
     *
     * @apiUse SamplePokemon
     * @apiUse NoRecords
     *
     */
    getByEvolutionName: function (req, res) {
        logger.info('Get Pokemon details by evolution name');

        let handler;

        if (req.params.category === 'prev') {
            handler = pokemon.getByPrevEvolutionName.bind(pokemon);
        } else if (req.params.category === 'next') {
            handler = pokemon.getByNextEvolutionName.bind(pokemon);
        }

        handler(req.params.name, function (success, message) {
            if (success === 1)
                res.status(200).json({message: 'Success', data: message});
            else
                res.status(404).json({message: 'Failure', data: message});
        });
    },
    /**
     * @api {get} /api/pokemon/search?gender=:gender&type=:type SearchPokemon
     * @apiVersion 0.0.1
     * @apiName SearchPokemon
     * @apiDescription Get pokemon by specified search parameters
     * @apiGroup Pokemon
     * @apiParam {String{1}=m,f,g,h} gender Gender of the pokemon
     * @apiParam {String} type Type of the pokemon
     *
     * @apiUse SamplePokemon
     * @apiUse NoRecords
     *
     */
    search: function (req, res) {
        logger.info('Get Pokemon details by search parameters');

        pokemon.search(req.query, function (success, message) {
            if (success === 1)
                res.status(200).json({message: 'Success', data: message});
            else
                res.status(404).json({message: 'Failure', data: message});
        });
    },

    /**
     * @api {get} /api/pokemon/sentiments/:pokemonNumber GetPokemonSentiments
     * @apiVersion 0.0.1
     * @apiName GetPokemonSentiments
     * @apiDescription Get sentiments for a specific pokemon by pokemon number (like 025 for Pikatchu, please note the leading 0)
     * @apiGroup Pokemon
     * @apiParam {String} pokemonNumber The pokemon number / id of a given pokemon like 025 for Pikatchu (leading 0 required)
     *
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * [
     *    {
     *      "date": "Sun Sep 18 2016 00:00:00 GMT+0200 (CEST)",
     *      "pos": 7,
     *      "neg": 0
     *    },
     *    {
     *      "date": "Mon Sep 19 2016 00:00:00 GMT+0200 (CEST)",
     *      "pos": 13,
     *      "neg": 0
     *    },
     *    {
     *      "date": Tue Sep 20 2016 00:00:00 GMT+0200 (CEST),
     *      "pos": 67,
     *      "neg": -46
     *    },
     *    {
     *      "date": Wed Sep 21 2016 00:00:00 GMT+0200 (CEST),
     *      "pos": 45,
     *      "neg": 0
     *    }
     * ]
     *
     */
    sentiments: function (req, res, databaseUrl) {
        try {
            hashPokemonGo.TwitterSentiments.setimentsForPokemon(databaseUrl, req.params.pokemonNumber, function (data) {
                    res.json(data);
                },
                function (error) {
                    logger.error(error);
                    res.status(500);
                    res.send(error);
                });
        } catch (e) {
            res.status(500);
            res.send(e);
        }
    },

    /**
     * @api {get} /api/pokemon/sentiments/:pokemonNumber/:lat/:lng GetPokemonSentimentsByLocation
     * @apiVersion 0.0.1
     * @apiName GetPokemonSentimentsByLocation
     * @apiDescription Get sentiments for a specific pokemon by pokemon number (like 025 for Pikatchu, please note the leading 0) for a specific location (radius of 2000 meters)
     * @apiGroup Pokemon
     * @apiParam {String} pokemonNumber The pokemon number / id of a given pokemon like 025 for Pikatchu (leading 0 required)
     * @apiParam {Double} lat The latitude of the position you want to get sentiments for this pokemon
     * @apiParam {Double} lng The longitude of the position you want tot get sentiments for this pokemon
     *
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * [
     *    {
     *      "date": "Sun Sep 18 2016 00:00:00 GMT+0200 (CEST)",
     *      "pos": 7,
     *      "neg": 0
     *    },
     *    {
     *      "date": "Mon Sep 19 2016 00:00:00 GMT+0200 (CEST)",
     *      "pos": 13,
     *      "neg": 0
     *    },
     *    {
     *      "date": Tue Sep 20 2016 00:00:00 GMT+0200 (CEST),
     *      "pos": 67,
     *      "neg": -46
     *    },
     *    {
     *      "date": Wed Sep 21 2016 00:00:00 GMT+0200 (CEST),
     *      "pos": 45,
     *      "neg": 0
     *    }
     * ]
     */
    sentimentsByLocation: function (req, res, databaseUrl) {
        try {
            hashPokemonGo.TwitterSentiments.sentimentsForPokemonByLocation(databaseUrl, req.params.pokemonNumber, parseFloat(req.params.lat), parseFloat(req.params.lng), function (data) {
                    res.json(data);
                },
                function (error) {
                    logger.error(error);
                    res.status(500);
                    res.send(error);
                });
        } catch (e) {
            res.status(500);
            res.send(e);
        }
    }
};