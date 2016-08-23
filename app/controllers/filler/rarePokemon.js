"use strict";

const rarePokemonStore = require(__appbase + 'stores/rarePokemon'),
    fs = require('fs'),
    jsonfile = require('jsonfile'),
    async = require('async'),
    common = require(__base + 'app/services/common'),
    config = require(__base+'config');

module.exports = {
    /*
     * for getting raraPokemond data from pokesnipers.com through an api request and storing into files
     */
    fill: function (callback) {
        let url = config.pokesniperUrl;
        common.getHttpRequestData(url);
        setInterval(function(){
            common.getHttpRequestData(url);
        }, config.pokesniperListeningInterval);
    },
    /*
     * for inserting rarePokemon data to MongoDB
     */
    insertToDb: function (callback) {

        const dirPath = __tmpbase + 'rarePokemon/';

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
                fs.readFile(dirPath + filename, 'utf-8', function(err, rarePokemons) {

                    logger.info('filename', filename);
                    logger.info('\n');

                    // some error on reading the file
                    if (err) {
                        logger.error('Error in reading file' + filename);
                        return;
                    }

                    if (rarePokemons !== undefined) {

                        // inserting the read content into MongoDB
                        insert(rarePokemons, function(success){
                            //decrease the number of files to be read
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
        let addRarePokemon = function (rarePokemon, callback) {
            rarePokemonStore.add(rarePokemon, function (success, data) {
                callback(success);
            });
        };

        /*
         * inserting the read data into MongoDB
         */
        let insert = function (rarePokemons, callback) {
            const rarePokemonRecords =JSON.parse(rarePokemons);
            let length = 0;

            async.forEach(rarePokemonRecords,function (rarePokemon, callback) {
                length++;
                addRarePokemon(rarePokemon, function(success){
                    callback();
                });

            }, function(err){
                callback(true);
            });
            logger.info('\n length',length);
        };
    }
};
