"use strict";

const sighting = require('../stores/sighting');

module.exports = {
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
    getAll: function (req, res) {
        logger.info('Get all pokemon sightings');

        sighting.getAll(function(success, pokemonSighting) {
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
    getById: function (req, res) {
        logger.info('Get all pokemon sightings by pokemon id');

        sighting.getById(req.params.id, function(success, message) {
            if(success === 1)
                res.status(200).json({message: 'Success', data: message});
            else
                res.status(404).json({message: 'Failure. No sighting details with the particular pokemon id exists!', data: message });
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
    getAtCoordinates: function (req, res) {
        logger.info('Get Pokemon Sightings at particular coordinates');

        sighting.getAtCoordinates(req.params, function(success, message) {
            if(success === 1)
                res.status(200).json({message: 'Success', data: message});
            else
                res.status(404).json({message: 'Failure. No sighting details along this latitude exists!', data: message});
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
    getBetweenCoordinates: function (req, res) {
        logger.info('Get Pokemon Sightings between particular coordinates');

        sighting.getBetweenCoordinates(req.params, function(success, message) {
            if(success === 1)
                res.status(200).json({message: 'Success', data: message});
            else
                res.status(404).json({message: 'Failure. No sighting details between these set of coordinate exists!', data: message });
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
    getBySource: function (req, res) {
        logger.info('Get Pokemon Sightings from a particular source');

        sighting.getFromSource(req.params.source.toUpperCase(), function(success, message) {
            if(success === 1)
                res.status(200).json({message: 'Success', data: message});
            else
                res.status(404).json({message: 'Failure. No sighting details from this source exists!', data: message});
        });
    }
};