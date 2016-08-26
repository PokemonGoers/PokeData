"use strict";

const pokeRadarStore = require(__appbase + 'stores/pokeRadar'),
    fs = require('fs'),
    jsonfile = require('jsonfile'),
    async = require('async'),
    common = require(__base + 'app/services/pokeRadar')


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
    insertToDb: function (callback) {

        const dirPath = __tmpbase + 'pokeRadar/';

        // reading the dfirectory under which all the files containing rarePokemon data is there
        fs.readdir(dirPath, function(err, filenames) {

            let noOfFiles = filenames.length,
                count =0;

            if (err) {
                logger.error('Error in reading directory' + dirPath);
                process.exit();
            }
            // when no files are present then exit the process
            if( noOfFiles === 0){
                logger.info('No files to read');
                process.exit();
            }

            logger.info('MongoDb Insertion...');

            // reading individual files for the data
            filenames.forEach(function(filename) {
                fs.readFile(dirPath + filename, 'utf-8', function(err, pokeRadar) {

                    logger.info('filename', filename);
                    logger.info('\n');

                    // some error on reading the file
                    if (err) {
                        console.log('Error in reading file' + filename);
                        return;
                    }

                    if (pokeRadar !== undefined) {

                        // inserting the read content into MongoDB
                        insert(pokeRadar, function(success){
                            noOfFiles--;
                            // deleting the file after it has been read and data being stored into database
                            fs.unlinkSync(dirPath + filename);
                            // if no files then sent a callback to calling function
                            if(noOfFiles === 0)
                                callback(true);
                        });
                    }

                });
            });
        });

        /*
         * inserting the read data into MongoDB
         */
        let addPokemon = function (pokemon, callback) {
            pokeRadarStore.add(pokemon, function (success, data) {
                callback(success);
            });
        };

        /*
         * inserting the read data into MongoDB
         */
        let insert = function (pokemons, callback) {
            const pokemonRecords = JSON.parse(pokemons);
            let length = 0;

            async.forEach(pokemonRecords, function (pokemon, callback) {
                length++;
                addPokemon(pokemon, function(success){
                    callback();
                });
            }, function(err){
                callback(true);
            });
            logger.info('\n length',length);
        };
    }
};
