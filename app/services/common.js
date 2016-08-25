"use strict";
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
    }
};