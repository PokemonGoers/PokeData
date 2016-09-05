"use strict";

const fs = require('fs'),
      pokemonDataJson = __appbase + '../resources/json/pokemonGoData.json';

module.exports = {
    /*
     *  required for http request to get JSON data
     */
    getHttpRequestData : function(url, callback){
        const request = require('request');

        request(url, function (error, response, body) {

            if (!error && response.statusCode === 200) {
                 const data = JSON.parse(body);
                 callback(data);
            }
        });
    },

    /*
     * get pokemon id for pokemon name
     */
    getPokemonIdByName : function(name) {
        let pokemonId = null;
        var jsonDataArray = JSON.parse(fs.readFileSync(pokemonDataJson, 'utf8'));
        
        for(var i =0; i < jsonDataArray.length; i++) {
            if(jsonDataArray[i].Name.toLowerCase() === name.toLowerCase()) {
                pokemonId = jsonDataArray[i].Number;
            }
        }
        return pokemonId;
    },

    /*
     * get pokemon name list
     */
    getPokemonNameList : function() {
        let pokemonNameArray = [];
        var jsonDataArray = JSON.parse(fs.readFileSync(pokemonDataJson, 'utf8'));;
        
        for(var i =0; i < jsonDataArray.length; i++) {
            pokemonNameArray.push(jsonDataArray[i].Name.toLowerCase())
        }
        return pokemonNameArray;
    },
    /*
     * takes arbitrary date and coordinates
     * and returns local time at this place as a String in "HH:MM:SS" format
     * just approximates timezone, assumes new timezone every 15° lng
     */
    getRelativeTime : function (date, lat, lng) {
        var offset = Math.sign(lng) * Math.ceil((Math.abs(lng) - 7.5)/15);
        var d = new Date(date.getTime() + offset * 3600000);
        return d.toUTCString().split(' ')[4];
    },
    /*
    * returns a classification of the environment at the given coordinates
    * for meaning of return values see http://glcf.umd.edu/data/lc/
    */
    getEnvironment : function (lat, lng) {
        var landcover = require(__appbase + '../resources/landcover.json');
        var cellsize = 0.0833333333333;
        if (lat > -64.0 && lat <= 84.0 && lng >= -180.0 && lng < 180.0) {
            var y = Math.floor((84.0 - lat)/cellsize);
            var x = Math.floor((lng + 180.0)/cellsize);
            return landcover[y][x];
        } else
            return 255;
    }
};