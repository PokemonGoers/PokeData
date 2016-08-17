'use strict';

let Twitter = require('twitter'),
    config = require('../config/config');

const client = new Twitter(config.twitter);

function twitterStreaming() {
    client.stream('statuses/filter', {track: '#pokemongo'}, function(stream) {
    stream.on('data', function(event) {
      // JSON tweet 
      console.log('tweets JSON about pokemongo: ' + JSON.stringify(event));
    });

    stream.on('error', function(error) {
      throw error;
    });
  });
}

module.exports = {
  startStreaming: twitterStreaming
};