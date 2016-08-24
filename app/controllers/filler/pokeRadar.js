"use strict";

const pokeRadarStore = require(__appbase + 'stores/pokeRadar'),
    fs = require('fs'),
    jsonfile = require('jsonfile'),
    async = require('async'),
    common = require(__base + 'app/services/pokeRadar'),
    config = require(__base + 'config');


module.exports = {
    /*
     * for getting raraPokemond data from pokesnipers.com through an api request and storing into files
     */
    fill: function (callback) {
        common.search();
    },
    /*
     * for inserting rarePokemon data to MongoDB
     */
    insertToDb: function (pokemons, callback) {

        const dirPath = __tmpbase + 'pokeRadar/';

        // reading the dfirectory under which all the files containing rarePokemon data is there
        fs.readdir(dirPath, function(err, filenames) {

            let noOfFiles = filenames.length,
                count =0;

            if (err) {
                console.log('Error in reading directory' + dirPath);
                process.exit();
            }
            // when no files are present then exit the process
            if( noOfFiles === 0){
                console.log('No files to read');
                process.exit();
            }

            console.log('MongoDb Insertion...');

            // reading individual files for the data
            filenames.forEach(function(filename) {
                fs.readFile(dirPath + filename, 'utf-8', function(err, pokeRadar) {

                    console.log('filename', filename);
                    console.log('\n');

                    // some error on reading the file
                    if (err) {
                        console.log('Error in reading file' + filename);
                        return;
                    }

                    if (rarePokemons !== undefined) {

                        // inserting the read content into MongoDB
                        insert(pokeRadar);
                        // deleting the file after it has been read and data being stored into database
                        fs.unlinkSync(dirPath + filename);
                    }

                });
            });
        });

        /*
         * inserting the read data into MongoDB
         */
        let addPokemon = function (pokemon) {
            pokeRadarStore.add(pokemon, function (success, data) {
                //console.log((success != 1) ? 'Error:' + data : 'Success: ' + data.id);
            });
        };

        /*
         * inserting the read data into MongoDB
         */
        let insert = function (pokemons) {
            const pokemonRecords = JSON.parse(pokemons);
            let length = 0;

            pokemonRecords.forEach(function (pokemon) {
                length++;
                addPokemon(pokemon);
            });
            console.log('\n length',length);
        };
    }
};
