'use strict';
/*
example tweet json :
{
	"created_at": "Thu Aug 18 20:17:20 +0000 2016",
	"id": 766368405037256700,
	"id_str": "766368405037256704",
	"text": "A wild Poliwhirl appeared! It will be at Red Butte Canyon until 02:23 PM. #SLC #PokemonGO https://t.co/JWpOPLfVpA",
	"source": "<a href=\"https://noctem.xyz\" rel=\"nofollow\">PokéTweeter</a>",
	"truncated": false,
	"in_reply_to_status_id": null,
	"in_reply_to_status_id_str": null,
	"in_reply_to_user_id": null,
	"in_reply_to_user_id_str": null,
	"in_reply_to_screen_name": null,
	"user": {
		"id": 758842850511495200,
		"id_str": "758842850511495168",
		"name": "Pokemon SLC",
		"screen_name": "SLCPokemon",
		"location": "Salt Lake City, UT",
		"url": null,
		"description": "I tweet out the location of rare Pokemon in Salt Lake City!",
		"protected": false,
		"verified": false,
		"followers_count": 71,
		"friends_count": 2,
		"listed_count": 23,
		"favourites_count": 0,
		"statuses_count": 2310,
		"created_at": "Fri Jul 29 01:53:29 +0000 2016",
		"utc_offset": -25200,
		"time_zone": "Pacific Time (US & Canada)",
		"geo_enabled": true,
		"lang": "en",
		"contributors_enabled": false,
		"is_translator": false,
		"profile_background_color": "000000",
		"profile_background_image_url": "http://abs.twimg.com/images/themes/theme1/bg.png",
		"profile_background_image_url_https": "https://abs.twimg.com/images/themes/theme1/bg.png",
		"profile_background_tile": false,
		"profile_link_color": "1B95E0",
		"profile_sidebar_border_color": "000000",
		"profile_sidebar_fill_color": "000000",
		"profile_text_color": "000000",
		"profile_use_background_image": false,
		"profile_image_url": "http://pbs.twimg.com/profile_images/758871468428013568/nbZ4gwPc_normal.jpg",
		"profile_image_url_https": "https://pbs.twimg.com/profile_images/758871468428013568/nbZ4gwPc_normal.jpg",
		"profile_banner_url": "https://pbs.twimg.com/profile_banners/758842850511495168/1469764834",
		"default_profile": false,
		"default_profile_image": false,
		"following": null,
		"follow_request_sent": null,
		"notifications": null
	},
	"geo": {
		"type": "Point",
		"coordinates": [40.768927, -111.808184]
	},
	"coordinates": {
		"type": "Point",
		"coordinates": [-111.808184, 40.768927]
	},
	"place": {
		"id": "1879ace9e02ace61",
		"url": "https://api.twitter.com/1.1/geo/id/1879ace9e02ace61.json",
		"place_type": "admin",
		"name": "Utah",
		"full_name": "Utah, USA",
		"country_code": "US",
		"country": "United States",
		"bounding_box": {
			"type": "Polygon",
			"coordinates": [
				[
					[-114.052999, 36.997905],
					[-114.052999, 42.001619],
					[-109.041059, 42.001619],
					[-109.041059, 36.997905]
				]
			]
		},
		"attributes": {}
	},
	"contributors": null,
	"is_quote_status": false,
	"retweet_count": 0,
	"favorite_count": 0,
	"entities": {
		"hashtags": [{
			"text": "SLC",
			"indices": [74, 78]
		}, {
			"text": "PokemonGO",
			"indices": [79, 89]
		}],
		"urls": [{
			"url": "https://t.co/JWpOPLfVpA",
			"expanded_url": "https://maps.google.com/maps?q=40.768927,-111.808184",
			"display_url": "maps.google.com/maps?q=40.7689…",
			"indices": [90, 113]
		}],
		"user_mentions": [],
		"symbols": []
	},
	"favorited": false,
	"retweeted": false,
	"possibly_sensitive": false,
	"filter_level": "low",
	"lang": "en",
	"timestamp_ms": "1471551440854"
}

important fields: 
	create_at	: UTC time when this Tweet was created.
	coordinates	: he longitude and latitude of the Tweet’s location.
	text		: The actual UTF-8 text of the status update.T.

*/

let fs = require('fs'),
    config = require('../../config'),
	Writable = require('stream').Writable,
    TwitterStream = require('twitter-stream-api'),
	pokemonTweet = require(__appbase + 'models/pokemonAppearances.js'),
    pokemonListPath = require(__appbase + '../resources/json/pokemonIdAndName.json');

const Twitter = new TwitterStream(config.twitter);

/*
	keywords used to search for in the tweets
	,  : represents OR
	' ': space represents AND 
*/
const tweetSearchKeywords = 'pokemon catch,pokemon saw,pokemon attack,pokemon find,pokemon caught,pokemon attacked,pokemon found,pokemon appeared,#foundPokemon,#caughtPokemon,#pokemongo,a wild appeared until #pokemongo';

// array of names of pokemons
var pokemonNameList = [];

// process the tweet object
let Output = Writable({objectMode: true});
Output._write = function (obj, enc, next) {
	checkIfTweetHasPokemonName(obj);
    next();
};

/*
	check if tweet object has pokemon term
 */
function checkIfTweetHasPokemonName(tweetObj) {
	let tweetText = tweetObj.text.toLowerCase();
	// check if the tweet text contains the important keywords
	if (tweetText.indexOf('caught') != -1 || 
		tweetText.indexOf('saw') != -1 || 
		tweetText.indexOf('attacked') != -1 ||
		tweetText.indexOf('found') != -1  ||
		tweetText.indexOf('appeared') != -1 ) {

		// for each pokemon name check if it is inside the tweet text
		let pokemonNameListLength = pokemonNameList.length;
		for(var i = 0; i < pokemonNameListLength; i++) {
			if (tweetObj.text.toLowerCase().indexOf(pokemonNameList[i]) != -1){
				//get pokemon names array
				console.log(tweetObj.text.toLowerCase());
				console.log(pokemonNameList[i] + " was found");
				addPokemonAppearanceToDB(tweetObj, pokemonNameList[i]);
			}
		}
	}
}

/*
	add pokemon appearance to DB 
	properties: tweetId (unique), pokemonName, foundAt (latitude,longitude), appearedOn: (DateString UTC)
 */

function addPokemonAppearanceToDB(tweetObj, pokemonName) {
	//default pokemon latitude and longitude set to -1, new values only if tweet contains coordinates
	let pokemonFoundLongitude = -1, pokemonFoundLatitude = -1;
	//get the location of the tweet
	if (tweetObj.coordinates){
		pokemonFoundLongitude = tweetObj.coordinates.coordinates[0]
		pokemonFoundLatitude = tweetObj.coordinates.coordinates[1]
	}

	pokemonTweet.create({tweetId: tweetObj.id_str, pokemonName: pokemonName, foundAt: {latitude: pokemonFoundLatitude, longitude: pokemonFoundLongitude}, appearedOn: tweetObj.created_at}, function (err, post) {
		if (err) {
			if (err.name === 'MongoError' && err.code === 11000) {
				console.log("Duplicate error")
				console.log(tweetObj.id_str + "tweet was discarded")
			} else {
				console.log(err);
			}
		} else {
			console.log("Adding tweet to DB")
		}
	});
}

function twitterStreaming() {
	let data = JSON.stringify(pokemonListPath, function (key, value) {
        var pokemonID, pokemonName;
        if (key != 'name' && typeof value.name !== "undefined") {
            pokemonNameList.push(value.name.toLowerCase());
		}
		return value;
	});

    // listen to keywords, get tweets in english language
    Twitter.stream('statuses/filter', {track: tweetSearchKeywords, language: 'en'});

    //Twitter stream events
    Twitter.on('connection success', function (uri) {
        console.log('Twitter stream connection success', uri);
    });

    Twitter.on('connection aborted', function () {
        console.log('Twitter stream connection aborted');
    });

    Twitter.on('connection error network', function () {
        console.log('Twitter stream connection error network');
    });

    Twitter.on('connection error stall', function () {
        console.log('Twitter stream connection error stall');
    });

    Twitter.on('connection error http', function (err) {
        console.log('Twitter stream connection error http', err);
    });

    Twitter.on('connection rate limit', function () {
        console.log('Twitter stream connection rate limit');
    });

    Twitter.on('connection error unknown', function () {
        console.log('Twitter stream connection error unknown');
    });

    Twitter.on('data keep-alive', function () {
        console.log('Twitter stream data keep-alive');
    });

    Twitter.on('data error', function () {
        console.log('Twitter stream data error');
    });

	//send output of twitter to output
    Twitter.pipe(Output);
}

module.exports = {
    startStreaming: twitterStreaming
};