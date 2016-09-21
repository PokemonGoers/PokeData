"use strict";

const sighting = require('../stores/sighting');

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
     * @apiDefine SampleSighting
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {"message":"Success",
     *  "data": [{
     *      "_id": "57c029e830632cbc2954518d",
     *      "source": "TWITTER",
     *      "pokemonId": 54,
     *      "appearedOn": "2016-08-26T11:37:12.469Z",
     *      "__v": 0,
     *      "location": {
     *          "coordinates": [ 14.017842, 14.017842 ],
     *          "type": "Point"}
     *  }] }
     *
     */

    /**
     * @api {get} /api/pokemon/sighting/ GetAllSightings
     * @apiVersion 0.0.1
     * @apiName GetAllSightings
     * @apiDescription Get all Pokemon sightings
     * @apiGroup PokemonSighting
     *
     * @apiUse SampleSighting
     * @apiUse NoRecords
     *
     */
    getAll: function (req, res) {
        logger.info('Get all pokemon sightings');

        sighting.getAll(function(success, pokemonSighting) {
            /*logger.info(pokemonSighting);*/
            if(success === 1)
                res.status(200).json({message: 'Success', data: pokemonSighting});
            else
                res.status(404).json({message: 'Failure. No sighting details found!', data: pokemonSighting});
        });
    },
    /**
     * @api {get} /api/pokemon/sighting/id/:id GetSightingById
     * @apiVersion 0.0.1
     * @apiName GetSightingById
     * @apiDescription Get Pokemon sightings by pokemon id
     * @apiGroup PokemonSighting
     * @apiParam {Integer{1-151}} id Pokemon ID
     *
     * @apiUse SampleSighting
     * @apiUse NoRecords
     * 
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
     * @apiParam {String=Longitude,Latitude} coordinates Location coordinates specified by Longitude, Latitude
     *
     * @apiUse SampleSighting
     * @apiUse NoRecords
     *
     * @apiSampleRequest off
     * 
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
     * @apiParam {String=Longitude,Latitude} fromCoordinates Coordinates of starting location specified by Longitude, Latitude
     * @apiParam {String=Longitude,Latitude} toCoordinates Coordinates of end location specified by Longitude, Latitude
     *
     * @apiUse SampleSighting
     * @apiUse NoRecords
     *
     * @apiSampleRequest off
     * 
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
     * @apiParam {String=twitter,pokesniper,pokeradar,skiplagged,pokecrew} source Source of the data extraction
     *
     * @apiUse SampleSighting
     * @apiUse NoRecords
     * 
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
     * @apiParam {String} ts Starting time-stamp in UTC format
     * @apiParam {String=w,d,h,m} range w(Week), d(Day), h(Hour), m(Minute)
     * Values can be specified preceding the letters. Example: 1w, 5d, 2h, 30m etc.
     *
     * @apiUse SampleSighting
     * @apiUse NoRecords
     *
     * @apiSampleRequest off
     * 
     */
    getByTimeRange: function (req, res) {
        logger.info('Get Pokemon Sightings within a specific time range');

        sighting.getByTimeRange(req.params, function(success, message) {
            if(success === 1)
                res.status(200).json({message: 'Success', data: message});
            else
                res.status(404).json({message: 'Failure. No sighting details within this time range exists!', data: message});
        });
    },
    /**
     * @api {get} /api/pokemon/sighting/search?id=:id&source=:source SearchPokemonSighting
     * @apiVersion 0.0.1
     * @apiName SearchPokemonSighting
     * @apiDescription Get pokemon sightings by specified search parameters
     * @apiGroup PokemonSighting
     * @apiParam {Integer{1-151}} id Pokemon ID
     * @apiParam {String=twitter,pokesniper,pokeradar,skiplagged,pokecrew} source Source of the data extraction
     *
     * @apiUse SampleSighting
     * @apiUse NoRecords
     *
     */
    search: function (req, res) {
        logger.info('Get Pokemon sightings by search parameters');

        sighting.search(req.query, function(success, message) {
            if(success === 1)
                res.status(200).json({message: 'Success', data: message});
            else
                res.status(404).json({message: 'Failure', data: message});
        });
    }
};