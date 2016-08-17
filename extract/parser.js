const fs = require('fs');

//The file https://s3.amazonaws.com/pokeradarassets/node-data.json contains over 11,000 entries
//and seems to be updated at least every day. I believe it contains all records pokeradar has at the moment.
//This script takes the node-data.json (in local directory) and extracts all relevant information (pokemonId,
//coords, time) and puts it in parsed.txt

var res = '';

fs.readFile('./node-data.json', 'utf8', function (err,data) {
  data = JSON.parse(data).data;
  console.log(data.length);
  for(var i = 0; i < data.length; i++) {
    temp = "pokemonId: " + data[i].pokemonId + ", latitude: " + data[i].latitude + ", longitude: " + data[i].longitude + ", created: " + (new Date(data[i].created * 1000)) + "\n"; 
    res += temp;
  }
  fs.writeFile("parsed.txt", res, function (err) {
    if (err) {
        return console.log(err);
    }
        console.log("The file was saved!");
  });
});



