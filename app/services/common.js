"use strict";
module.exports = {
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
    }
};