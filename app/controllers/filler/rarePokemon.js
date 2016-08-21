"use strict";

const rarePokemonModel = require(__appbase + 'models/rarePokemon'),
    rarePokemonStore = require(__appbase + 'stores/rarePokemon'),
    fs = require('fs'),
    jsonfile = require('jsonfile'),
    async = require('async'),
    services = require(__base + 'services');


module.exports = {
    /*
     * for getting raraPokemond data from pokesnipers.com through an api request and storing into files
     */
    fill: function (callback) {
        let url = "https://pokesnipers.com/api/v1/pokemon.json?referrer=home";
            setInterval(function(){
                services.getHttpRequestData(url)
            }, 10000);
    },
    /*
     * for inserting rarePokemon data to MongoDB
     */
    insertToDb: function (pokemons, callback) {

        const dirPath = __tmpbase + 'rarePokemon/';

        // reading the dfirectory under which all the files containing rarePokemon data is there
        fs.readdir(dirPath, function(err, filenames) {
            if (err) {
                console.log('Error in directory' + dirPath);
                return;
            }
            // when no files are present then exit the process
            if( filenames.length === 0){
                console.log('No files to read');
                process.exit();
            }
            console.log('MongoDb Insertion...');

            // reading individual files for the data
            filenames.forEach(function(filename) {
                fs.readFile(dirPath + filename, 'utf-8', function(err, rarePokemons) {
                    console.log('filename', filename);
                    console.log('\n');
                    if (err) {
                        console.log('Error in reading file' + filename);
                        return;
                    }

                    // inserting the read content into MongoDB
                    if (rarePokemons !== undefined) {
                        //console.log(rarePokemons);
                        fs.unlinkSync(dirPath + filename);
                        insert(rarePokemons);
                    }

                });

            });

        });


        /*
         * inserting the read data into MongoDB
         */
        let addRarePokemon = function (rarePokemon, callback) {
            rarePokemonStore.add(rarePokemon, function (success, data) {
                //console.log((success != 1) ? 'Error:' + data : 'Success: ' + data.id);
                callback(true);
            });
        };

        /*
         * inserting the read data into MongoDB
         */
        let insert = function (rarePokemons) {
            const rarePokemonRecords =JSON.parse(rarePokemons);
            let length = 0;

            rarePokemonRecords.forEach(function (rarePokemon) {
                length++;
                addRarePokemon(rarePokemon, function (success) {
                });

            }, function (err) {

            });
            console.log('\n length',length);
        };
    }
};
