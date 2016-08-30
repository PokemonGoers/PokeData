"use strict";

const sighting = require('../stores/sighting');

module.exports = {
    /**
     * @api {get} /pokemon/sighting/ GetAllSightings
     * @apiVersion 0.0.1
     * @apiName GetAllSightings
     * @apiDescription Get all Pokemon sightings
     * @apiGroup PokemonSighting
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
     * @api {get} /pokemon/sighting/id/ GetSightingById
     * @apiVersion 0.0.1
     * @apiName GetSightingById
     * @apiDescription Get Pokemon sightings by pokemon id
     * @apiGroup PokemonSighting
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
     * @api {get} /api/pokemon/sighting/coordinates/:coordinates GetSightingAtCoordinates
     * @apiVersion 0.0.1
     * @apiName GetSightingAtCoordinates
     * @apiDescription Get Pokemon Sightings at specific coordinates
     * @apiGroup PokemonSighting
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
     * @api {get} /api/pokemon/sighting/coordinates/from/:fromCoordinates/to/:toCoordinates GetSightingBetweenCoordinates
     * @apiVersion 0.0.1
     * @apiName GetSightingBetweenCoordinates
     * @apiDescription Get Pokemon Sightings between specific set of coordinates
     * @apiGroup PokemonSighting
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
     * @api {get} /api/pokemon/sighting/source/:source GetSightingBySource
     * @apiVersion 0.0.1
     * @apiName GetSightingBySource
     * @apiDescription Get pokemon sightings by specific source
     * @apiGroup PokemonSighting
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
    },
    /**
     * @api {get} /api/pokemon/sighting/ts/:ts/range/:range GetSightingByTimeRange
     * @apiVersion 0.0.1
     * @apiName GetSightingByTimeRange
     * @apiDescription Get pokemon sightings within a specific time range
     * @apiGroup PokemonSighting
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
    getByTimeRange: function (req, res) {
        logger.info('Get Pokemon Sightings within a specific time range');

        sighting.getByTimeRange(req.params, function(success, message) {
            if(success === 1)
                res.status(200).json({message: 'Success', data: message});
            else
                res.status(404).json({message: 'Failure. No sighting details within this time range exists!', data: message});
        });
    }
};