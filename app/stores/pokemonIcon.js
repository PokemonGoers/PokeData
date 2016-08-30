"use strict"

let fs = require('fs'),
    http = require('http');
let pokemonIcon = require("../models/pokemonIcon");

module.exports = {
    /*
     * fetching the particular pokemon details
     */
    get: function (data, callback) {
        pokemonIcon.find(data, function (err, obj) {
            if (!obj || obj.length === 0) {// already existing data and return 0 for indicating
                callback(0, data);
            } else { // new data and return 1 for indicating
                callback(1, obj);
            }
        });
    },
    add: function(body, callback) {
        //console.log(JSON.stringify(body))

        if(body.pokemonIconUrl && body.pokemonId) {
            console.log('set ic file');
            let pokemonId = body.pokemonId;
            const request = require('request');

               var download = function(uri){
                    request.head({url: uri, encoding: null }, function(err, res, imageBody){
                        console.log(imageBody);
                        console.log(res.body);
                        if(!err && res.statusCode == 200) {
                            let newPokemonIcon = pokemonIcon({icon: {data: res.body, contentType: 'image/png'}, pokemonId: pokemonId});
                            newPokemonIcon.save(function (err) {
                                if (err) {
                                    logger.error('error saving icon to mongo');
                                    callback(0, err);
                                    //throw err;
                                } else {
                                    logger.info('saved icon to mongo');
                                    callback(1, newPokemonIcon);
                                }
                            });
                        } else {
                            logger.error('error saving icon to mongo');
                                    callback(0, 'error saving icon to mongo');
                        }
                    });
                };

                download(body.pokemonIconUrl);
            
        } else {
            console.log('Empty Body');
            callback(0, 'Empty Body');
        }
    },

    /*
     * get the pokemon details of particular pokemon based on name
     */
    getById : function (id, callback) {
        this.get({'pokemonId': id}, function (status, response) {
            callback(status, response);
        });
    },
}