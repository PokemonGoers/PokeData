module.exports = {
    getHttpRequestData : function(url){
        var request = require('request');
        var fs = require('fs');
        var all = [];

        request(url, function (error, response, body) {

            if (!error && response.statusCode == 200) {
                var data = JSON.parse(body);

                fs.appendFile((__tmpbase+"rarePokemon/rarePokemon_"+parseInt(Math.floor(Date.now() / 1000))+".json").toString(), JSON.stringify(data.results), function(err) {
                    if(err) {
                        return console.log(err);
                    }
                    console.log("The file was saved!");
                });
            }
        });
    }
};