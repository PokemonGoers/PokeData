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

                      dirName = __tmpbase + collection,
                      fileName = (dirName + "/" + collection + "_" + parseInt(Math.floor(Date.now() / 1000)) + ".json").toString();

                try {
                    fs.statSync(dirName);
                } catch(e) {
                    fs.mkdirSync(dirName);

                    fs.appendFile(fileName, JSON.stringify(data.results), function(err) {
                        if (err) {
                            return logger.error(err);
                        }
                        logger.info("The file was saved!", fileName);
                    });
                }

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