'use strict'

let Twitter = require('twitter');

//twitter credentials
const consumerKey = '46yqEVwOOkf7dtN5Zfqxw4Nzu',
    consumerSecret = 'YuddFwV6Q36wfi48Ng9sutHcmwNKbxZs6betIbt9RhAiKobOKw',
    accessTokenKey = '764827436576014337-Ljq7oKGQrAFYlalefsC8IymBjzSVpxO',
    accessTokenSecret = 'P2MgOCT4kTvZRdnreNsHFdbL6hN4kYzwyHrW4Ktwz8pXp';

const client = new Twitter({
  consumer_key: consumerKey,
  consumer_secret: consumerSecret,
  access_token_key: accessTokenKey,
  access_token_secret: accessTokenSecret
});
 
client.stream('statuses/filter', {track: '#pokemongo'}, function(stream) {
  stream.on('data', function(event) {
    // JSON tweet 
    console.log('tweets JSON about pokemongo: ' + JSON.stringify(event));
  });

  stream.on('error', function(error) {
    throw error;
  });
});