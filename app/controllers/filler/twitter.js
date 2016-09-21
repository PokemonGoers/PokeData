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

let config = require(__appbase + '../config'),
	Writable = require('stream').Writable,
    TwitterStream = require('twitter-stream-api'),
	TwitterStore = require(__appbase + 'stores/twitter'),
	common = require(__base + 'app/services/common');

const Twitter = new TwitterStream(config.twitter);
const pathToSaveTwitterPokeData = __tmpbase + 'twitterPokemonData/';
const jsonFileName = 'twitterPokemonData';

// array of names of pokemons
var pokemonNameList = [];


module.exports = {
	getPokemonTwitterStream: function (){
		if (!this._streaming){
			pokemonNameList = common.getPokemonNameList();
			if(pokemonNameList) {
				logger.info('Got pokemon name list');
			}
			var listenFor =  config.twitterKeyWords + "," + pokemonNameList.join(",");
			logger.info("Listening for : " + listenFor);
			Twitter.stream(
				'statuses/filter',
				{
					track: listenFor,
					language: 'en'
				}
			);

			Twitter.on('connection success', function (uri) {
				logger.success('Connection successful', 'Twitter stream connection success' + uri);
			});

			Twitter.on('connection aborted', function () {
				logger.info('Twitter stream connection aborted');
			});

			Twitter.on('connection error network', function () {
				logger.error('Twitter stream connection error network');
			});

			Twitter.on('connection error stall', function () {
				logger.error('Twitter stream connection error stall');
			});

			Twitter.on('connection error http', function (err) {
				logger.error('Twitter stream connection error http', err);
			});

			Twitter.on('connection rate limit', function () {
				logger.info('Twitter stream connection rate limit');
			});

			Twitter.on('connection error unknown', function () {
				logger.error('Twitter stream connection error unknown');
			});

			Twitter.on('data keep-alive', function () {
				logger.info('Twitter stream data keep-alive');
			});

			Twitter.on('data error', function () {
				logger.error('Twitter stream data error');
			});
			this._streaming = true;
		}
		return Twitter;
	},
    insertToDb : function () {
		// listen to keywords, get tweets in english language
		var stream = this.getPokemonTwitterStream();

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
				tweetText.indexOf('got you') != -1  ||
				tweetText.indexOf('gotcha') != -1  ||
				tweetText.indexOf('gotcha') != -1  ||
				tweetText.indexOf('gotcha') != -1  ||
				tweetText.indexOf('appeared') != -1 ) {

				// for each pokemon name check if it is inside the tweet text
				let pokemonNameListLength = pokemonNameList.length;
				for(var i = 0; i < pokemonNameListLength; i++) {
					// regular expression to check name of pokemon with one space in the front and end
					// to not count pokemon twice if name is substring of another pokemon name e.g. mew and mewtwo
					let pokemonNameRegEx = new RegExp('\\s' + pokemonNameList[i] + '\\s','g');
					if (tweetText.match(pokemonNameRegEx)){ 
						//get pokemon names array
						logger.info(tweetObj.text.toLowerCase());
						logger.info(pokemonNameList[i] + ' was found');
						addPokemonAppearanceToDB(tweetObj, pokemonNameList[i]);
					}
				}
			}
		}

		// process the tweet object
		let Output = Writable({objectMode: true});
		Output._write = function (obj, enc, next) {
			checkIfTweetHasPokemonName(obj);
			next();
		};

		stream.pipe(Output);

		/*
			add pokemon appearance to DB 
			properties: tweetId (unique), pokemonName, foundAt (latitude,longitude), appearedOn: (DateString UTC)
		*/

		function addPokemonAppearanceToDB(tweetObj, pokemonName) {
            TwitterStore.add(tweetObj, pokemonName);
		}
	}
};