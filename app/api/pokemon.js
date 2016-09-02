"use strict";

const pokemon = require('../stores/pokemon');

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
     */

    /**
     * @apiDefine PokemonIconResponse
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {"message":"Success",
     *  "data": [{
     *        icon: {
     *          data: "R0lGODlhJQAmAPMPADqUlBlKShAQEL3/c6XWQnOtMVJjKYTvxWPWtTFzc/////9rYI5fCZNJWrd
     *          6SPn69BARcGFCfQQBLtvV6ZKvUmwQLW4Xgk08fNoiTXbC5axBQYwgFHR16/MiEwscE5WLKbJASosEl6CpsNNSAQb16NXf
     *          iu3QafXWrcbPugL53QTdltsNQhce3F/BUaCUF9pTQcJDg4Bh1xSizCBAQw0kAddXwkMDQqWawIBfy6MnZ8
     *          aqOTpgoKAaqsQy8oApQMClqFAMENpw5ruawovTEJCqcAoU0ApwsLqGsJXAHNr88Ix9N6e8fYyXjK3pwxKuXw5d3qyu2rcJe
     *          HTgnwCSoCXLh1ywXAWycA0RqU8xdCgAKB8wYS9HaEYIJjGDM2gFhQHQllFU1CBGzAABs2jiLxcCx4ISU9OC4FEuyYyUKuhjh
     *          dKsskseaMPTOVvekGsCecC9zeqNhJjug6gmUkJMUE8x4ip0yjmtHjc9pVlr/OiJURAQAhFAjFjmwThMKjq
     *          QQJBQAAACwAAAAAIwAhAAACIISPqcvtD6OctNqLs968+w+G4kiW5omm6sq27gvH8vwVACH5BAUKAA8ALAAABwAjABoAAAT/8M
     *          lJq7Xm6q2NIYKgBQEnFUUgeB6BGoVYAcdBPkmu6+SBCAOCsECAySi0Wq7GRDgDTeAANTQcJ7QkE8D1IZo/VLB6lQASzBq363U
     *          6AdJxMVZBp9datxs6AvndBN2W2w1CFx7cX8FRoJQX2lNBwkODgGHXFKLMIEBDDSQB11fCQwNCpZrQH8ujJ2fPmqjk6YKCg
     *          GqAYsvKAKUDApahQDADacOayRDKK4xCQqnAKFNAKcLC6hrCQABzLzOCMbSenvG18h4XN3fMSrk7+Tq6dzdnO1wl4dOCe8JKgJ
     *          ctqVb1wkAtAbk/IUQoECgPHW4uPWaEDGBsYsYGzjkhodERBUVTEIEbMDg2rWNIgdG5HYh5Tw4LvFsZGkB18KbMQM+5JipZseXP+
     *          UQdwaE8L25bCFBBxaVKncC5ExZT1wUqkTR/KiAAAOw=="
     *          contentype: "image/gif"
     *        }
     * }] }
     * 
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
     * @apiUse SamplePokemon
     * @apiUse NoRecords
     * 
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
     * @api {get} /api/pokemon/id/:id/icon GetIconById
     * @apiVersion 0.0.1
     * @apiName GetIconById
     * @apiDescription Get pokemon icon by specific id
     * @apiGroup Pokemon
     * @apiParam {Integer{1-151}} id Pokemon ID
     *
     * @apiUse PokemonIconResponse
     * @apiUse NoRecords
     * 
     */
    getIconById: function(req, res) {
        logger.info('Get Pokemon icon of particular pokemon by id');

        pokemon.getIconById(req.params.id, function(success, message) {
            if(success === 1)
                res.status(200).json({message: 'Success', data: message});
            else
                res.status(404).json({message: 'Failure. No pokemon icon with this id exists!', data: message});
        });
    }
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
     * @apiUse SamplePokemon
     * @apiUse NoRecords
     * 
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
     * @apiUse SamplePokemon
     * @apiUse NoRecords
     *
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
     * @apiUse SamplePokemon
     * @apiUse NoRecords
     * 
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
     * @apiUse SamplePokemon
     * @apiUse NoRecords
     * 
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
     * @apiParam {String=fast,special} category Category of attack
     * @apiParam {String} type Type of the attack
     *
     * @apiUse SamplePokemon
     * @apiUse NoRecords
     * 
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
     * @apiParam {String=fast,special} category Category of attack
     * @apiParam {String} name Name of the attack
     *
     * @apiUse SamplePokemon
     * @apiUse NoRecords
     * 
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
     * @apiParam {String=fast,special} category Category of attack
     * @apiParam {Integer} damage Damage value of the attack
     *
     * @apiUse SamplePokemon
     * @apiUse NoRecords
     * 
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

        handler(req.params.name, function(success, message) {
            if(success === 1)
                res.status(200).json({message: 'Success', data: message});
            else
                res.status(404).json({message: 'Failure.', data: message});
        });
    }
};