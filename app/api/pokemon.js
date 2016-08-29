"use strict";
module.exports = {
    /**
     * @api {get} /api/pokemons/ Get all pokemons
     * @apiVersion 0.0.1
     * @apiName GetAllPokemons
     * @apiDescription Get all pokemons.
     * @apiGroup Pokemons
     *
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * [
     *    {
     *      "_id": "57b60a60f3981b52102ef562",
     *      "deviceId": "80sxy0vumg2h5hhv8hgc0axt9jr29al7",
     *       "userId": "13661365",
     *       "trainerName": "(Poke Radar Prediction)",
     *       "pokemonId": "133",
     *       "longitude": 2.3887459103,
     *       "latitude": 48.8923425896,
     *       "upvotes": 1,
     *       "downvotes": 0,
     *       "created": 1470888182,
     *       "id": "Sybxo5uYt",
     *       "__v": 0
          }
     * ]
     *
     * @apiSuccessExample {json} No db-entries:
     * HTTP/1.1 200 OK
     * [
     * ]
     */
    getAllPokemons: function (req, res) {
        logger.info('GetAllPokemons');
        let pokemonStore = require('../stores/pokemon');
        pokemonStore.getAllPokemons(function(success,pokemons) {
            logger.info(pokemons);
            res.status(200).json(pokemons);
        });
    },
    /**
     * @api {get} /pokemon/sighting Get all pokemon sightings
     * @apiVersion 0.0.1
     * @apiName GetSightings
     * @apiDescription Get all Pokemon sightings
     * @apiGroup Pokemons
     *
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * [
     *    {
     * "_id": "57c029e830632cbc2954518d",
     * "source": "TWITTER",
     *  "pokemonId": 54,
     * "appearedOn": "2016-08-26T11:37:12.469Z",
     * "__v": 0,
     * "location": {
     *              "coordinates": [
     *                  14.017842,
     *                  14.017842
     *              ],
     *              "type": "Point"
     *             }
     *   }
     * ]
     *
     * @apiSuccessExample {json} No db-entries:
     * HTTP/1.1 200 OK
     * [
     * ]
     */
    getAllSightings: function (req, res) {
        logger.info('Get all pokemon sightings');
        let pokemonAppearancesStore = require('../stores/pokemon');
        pokemonAppearancesStore.getAll(function(success,pokemonSighting) {
            logger.info(pokemonSighting);
            res.status(200).json(pokemonSighting);
        });
    },
    /**
     * @api {get} /pokemon/sighting/id/ Get all pokemon sightings by pokemon id
     * @apiVersion 0.0.1
     * @apiName GetSightingById
     * @apiDescription Get all Pokemon sightings by pokemon id
     * @apiGroup Pokemon
     *
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * [
     *    {
     * "_id": "57c029e830632cbc2954518d",
     * "source": "TWITTER",
     *  "pokemonId": 54,
     * "appearedOn": "2016-08-26T11:37:12.469Z",
     * "__v": 0,
     * "location": {
     *     "coordinates": [
     *        14.017842,
     *        14.017842
           ]
     *     "type": "Point"
     *  }
     * }
     * ]
     *
     * @apiSuccessExample {json} No db-entries:
     * HTTP/1.1 200 OK
     * [
     * ]
     */
    getSightingsById: function (req, res) {
        logger.info('Get all pokemon sightings by pokemon id');
        let pokemonStore = require('../stores/pokemon');
        pokemonStore.getById(req.params.id, function(success, message) {
            if(success === 1)
                res.status(200).json({ message: 'Success', data: message });
            else
                res.status(404).json({ message: 'Failure. No sighting details with the particular pokemon id exists!',data: message });
        });
    },
    /**
     * @api {get} /api/pokemonsSighting/ Get pokemons sightings at particular coordinates
     * @apiVersion 0.0.1
     * @apiName Get Pokemon Sightings at particular coordinates
     * @apiDescription Get Pokemon Sightings at particular coordinates
     * @apiGroup Pokemon
     *
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * [
     *    {
     * "_id": "57c029e830632cbc2954518d",
     * "source": "TWITTER",
     *  "pokemonId": 54,
     * "appearedOn": "2016-08-26T11:37:12.469Z",
     * "__v": 0,
     * "location": {
     *     "coordinates": [
     *        14.017842,
     *        14.017842
           ]
     *     "type": "Point"
     *  }
     * }
     * ]
     *
     * @apiSuccessExample {json} No db-entries:
     * HTTP/1.1 200 OK
     * [
     * ]
     */
    getPokemonAtCoordinates: function (req, res) {
        logger.info('Get Pokemon Sightings at particular coordinates');
        let pokemonStore = require('../stores/pokemon'),
            reqObj ={
                longitude: req.params.longitude,
                latitude : req.params.latitude,
            };
        pokemonStore.getAtCoordinates(reqObj, function(success, message) {

            if(success === 1)
                res.status(200).json({ message: 'Success', data: message });
            else
                res.status(404).json({ message: 'Failure. No sighting details along this latitude exists!',data: message });
        });
    },
    /**
     * @api {get} /api/pokemonsSighting/ Get pokemons sightings between particular set of coordinates
     * @apiVersion 0.0.1
     * @apiName Get Pokemon Sightings between particular set of coordinates
     * @apiDescription Get Pokemon Sightings between particular set of coordinates
     * @apiGroup Pokemon
     *
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * [
     *    {
     * "_id": "57c029e830632cbc2954518d",
     * "source": "TWITTER",
     *  "pokemonId": 54,
     * "appearedOn": "2016-08-26T11:37:12.469Z",
     * "__v": 0,
     * "location": {
     *     "coordinates": [
     *        14.017842,
     *        14.017842
           ]
     *     "type": "Point"
     *  }
     * }
     * ]
     *
     * @apiSuccessExample {json} No db-entries:
     * HTTP/1.1 200 OK
     * [
     * ]
     */
    getPokemonBetweenCoordinates: function (req, res) {
        logger.info('Get Pokemon Sightings between particular coordinates');
        let pokemonStore = require('../stores/pokemon');
        pokemonStore.getBetweenCoordinates(req.params, function(success, message) {

            if(success === 1)
                res.status(200).json({ message: 'Success', data: message });
            else
                res.status(404).json({ message: 'Failure. No sighting details between these set of coordinate exists!',data: message });
        });
    },
    /**
     * @api {get} /api/pokemonsSighting/ Get pokemons sightings between particular set of coordinates
     * @apiVersion 0.0.1
     * @apiName Get Pokemon Sightings between particular set of coordinates
     * @apiDescription Get Pokemon Sightings between particular set of coordinates
     * @apiGroup Pokemon
     *
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * [
     *    {
     * "_id": "57c029e830632cbc2954518d",
     * "source": "TWITTER",
     *  "pokemonId": 54,
     * "appearedOn": "2016-08-26T11:37:12.469Z",
     * "__v": 0,
     * "location": {
     *     "coordinates": [
     *        14.017842,
     *        14.017842
           ]
     *     "type": "Point"
     *  }
     * }
     * ]
     *
     * @apiSuccessExample {json} No db-entries:
     * HTTP/1.1 200 OK
     * [
     * ]
     */
    getPokemonFromSource: function (req, res) {
        logger.info('Get Pokemon Sightings from a particular source');
        let pokemonStore = require('../stores/pokemon'),
            reqObj = {
                source: (req.params.source).toUpperCase()
            };
        pokemonStore.getFromSource(reqObj, function(success, message) {

            if(success === 1)
                res.status(200).json({ message: 'Success', data: message });
            else
                res.status(404).json({ message: 'Failure. No sighting details from this source exists!',data: message });
        });
    },
    /**
     * @api {get} /api/pokemonsSighting/ Get pokemons sightings between particular set of coordinates
     * @apiVersion 0.0.1
     * @apiName Get Pokemon Sightings between particular set of coordinates
     * @apiDescription Get Pokemon Sightings between particular set of coordinates
     * @apiGroup Pokemon
     *
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * [
     *    {
     * "_id": "57c029e830632cbc2954518d",
     * "source": "TWITTER",
     *  "pokemonId": 54,
     * "appearedOn": "2016-08-26T11:37:12.469Z",
     * "__v": 0,
     * "location": {
     *     "coordinates": [
     *        14.017842,
     *        14.017842
           ]
     *     "type": "Point"
     *  }
     * }
     * ]
     *
     * @apiSuccessExample {json} No db-entries:
     * HTTP/1.1 200 OK
     * [
     * ]
     */
    getPokemonById : function (req, res) {
        logger.info('Get Pokemon details of a particular pokemon by id');
        let pokemonStore = require('../stores/pokemon');

        pokemonStore.getPokemonById(req.params.id, function(success, message) {
            if(success === 1)
                res.status(200).json({ message: 'Success', data: message });
            else
                res.status(404).json({ message: 'Failure. No pokemon details with this id exists!',data: message });
        });
   },
    /**
     * @api {get} /api/pokemonsSighting/ Get pokemons sightings between particular set of coordinates
     * @apiVersion 0.0.1
     * @apiName Get Pokemon Sightings between particular set of coordinates
     * @apiDescription Get Pokemon Sightings between particular set of coordinates
     * @apiGroup Pokemon
     *
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * [
     *    {
     * "_id": "57c029e830632cbc2954518d",
     * "source": "TWITTER",
     *  "pokemonId": 54,
     * "appearedOn": "2016-08-26T11:37:12.469Z",
     * "__v": 0,
     * "location": {
     *     "coordinates": [
     *        14.017842,
     *        14.017842
           ]
     *     "type": "Point"
     *  }
     * }
     * ]
     *
     * @apiSuccessExample {json} No db-entries:
     * HTTP/1.1 200 OK
     * [
     * ]
     */
    getPokemonByGender : function (req, res) {
        logger.info('Get Pokemon details by gender');
        let pokemonStore = require('../stores/pokemon');

        pokemonStore.getPokemonByGender(req.params.gender, function(success, message) {
            if(success === 1)
                res.status(200).json({ message: 'Success', data: message });
            else
                res.status(404).json({ message: 'Failure. No pokemon details with this gender exists!',data: message });
        });
    },

    /**
     * @api {get} /api/pokemonsSighting/ Get pokemons sightings between particular set of coordinates
     * @apiVersion 0.0.1
     * @apiName Get Pokemon Sightings between particular set of coordinates
     * @apiDescription Get Pokemon Sightings between particular set of coordinates
     * @apiGroup Pokemon
     *
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * [
     *    {
     * "_id": "57c029e830632cbc2954518d",
     * "source": "TWITTER",
     *  "pokemonId": 54,
     * "appearedOn": "2016-08-26T11:37:12.469Z",
     * "__v": 0,
     * "location": {
     *     "coordinates": [
     *        14.017842,
     *        14.017842
           ]
     *     "type": "Point"
     *  }
     * }
     * ]
     *
     * @apiSuccessExample {json} No db-entries:
     * HTTP/1.1 200 OK
     * [
     * ]
     */
    getPokemonByName : function (req, res) {
        logger.info('Get Pokemon details by name');
        let pokemonStore = require('../stores/pokemon');

        pokemonStore.getPokemonByName(req.params.name, function(success, message) {
            if(success === 1)
                res.status(200).json({ message: 'Success', data: message });
            else
                res.status(404).json({ message: 'Failure. No pokemon details with this name exists!',data: message });
        });
    },
    /**
     * @api {get} /api/pokemonsSighting/ Get pokemons sightings between particular set of coordinates
     * @apiVersion 0.0.1
     * @apiName Get Pokemon Sightings between particular set of coordinates
     * @apiDescription Get Pokemon Sightings between particular set of coordinates
     * @apiGroup Pokemon
     *
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * [
     *    {
     * "_id": "57c029e830632cbc2954518d",
     * "source": "TWITTER",
     *  "pokemonId": 54,
     * "appearedOn": "2016-08-26T11:37:12.469Z",
     * "__v": 0,
     * "location": {
     *     "coordinates": [
     *        14.017842,
     *        14.017842
           ]
     *     "type": "Point"
     *  }
     * }
     * ]
     *
     * @apiSuccessExample {json} No db-entries:
     * HTTP/1.1 200 OK
     * [
     * ]
     */
    getPokemonByResistance : function (req, res) {
        logger.info('Get Pokemon details by resistance');
        let pokemonStore = require('../stores/pokemon');

        pokemonStore.getPokemonByResistance(req.params.resistance, function(success, message) {
            if(success === 1)
                res.status(200).json({ message: 'Success', data: message });
            else
                res.status(404).json({ message: 'Failure.',data: message });
        });
    },
    /**
     * @api {get} /api/pokemonsSighting/ Get pokemons sightings between particular set of coordinates
     * @apiVersion 0.0.1
     * @apiName Get Pokemon Sightings between particular set of coordinates
     * @apiDescription Get Pokemon Sightings between particular set of coordinates
     * @apiGroup Pokemon
     *
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * [
     *    {
     * "_id": "57c029e830632cbc2954518d",
     * "source": "TWITTER",
     *  "pokemonId": 54,
     * "appearedOn": "2016-08-26T11:37:12.469Z",
     * "__v": 0,
     * "location": {
     *     "coordinates": [
     *        14.017842,
     *        14.017842
           ]
     *     "type": "Point"
     *  }
     * }
     * ]
     *
     * @apiSuccessExample {json} No db-entries:
     * HTTP/1.1 200 OK
     * [
     * ]
     */
    getPokemonByWeakness : function (req, res) {
        logger.info('Get Pokemon details by weakness');
        let pokemonStore = require('../stores/pokemon');

        pokemonStore.getPokemonByWeakness(req.params.weakness, function(success, message) {
            if(success === 1)
                res.status(200).json({ message: 'Success', data: message });
            else
                res.status(404).json({ message: 'Failure.',data: message });
        });
    }
};