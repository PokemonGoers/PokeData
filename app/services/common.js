"use strict";

const fs = require('fs'),
      pokemonDataJson = __appbase + '../resources/json/pokemonGoData.json';

module.exports = {
    /*
     *  required for http request to get JSON data and storing it into a file.
     */
    getHttpRequestData : function(url){
        let request = require('request'),
            fs = require('fs'),
            all = [];

        request(url, function (error, response, body) {

            if (!error && response.statusCode === 200) {
                const data = JSON.parse(body),
                      srcName = collection,
                      fileName = (__tmpbase+srcName+"/"+srcName+"_"+parseInt(Math.floor(Date.now() / 1000))+".json").toString();

                fs.appendFile(fileName, JSON.stringify(data.results), function(err) {
                    if(err) {
                        return console.log(err);
                    }
                    logger.info("The file was saved!");
                });
            }
        });
    },

    /*
     * get pokemon id for pokemon name
     */
    getPokemonIdByName : function(name) {
        let pokemonId = null;
        var jsonDataArray = JSON.parse(fs.readFileSync(pokemonDataJson, 'utf8'));;
        
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
    }
};