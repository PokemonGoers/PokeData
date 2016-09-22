// Required for WebSocket connection
const hashPokemonGo = require('hashpokemongo');
const TwitterModule = require("twitter");
const config = require(__base + 'config');

const twitterOptions = {
    consumer_key: config.twitter.consumer_key,
    consumer_secret: config.twitter.consumer_secret,
    access_token_key: config.twitter.token,
    access_token_secret: config.twitter.token_secret
};

const twitterClient = new TwitterModule(twitterOptions);
const io = require('socket.io')(config.hashPokemonGoWebSocketPort);
const pokemonSearchTerms = config.twitterKeyWords;
const pokemonNames = config.pokemonNames;
const twitterStreamForHashPokemonGo = twitterClient.stream('statuses/filter', {track: pokemonSearchTerms + "," + pokemonNames});

module.exports = {
    insertToDb : function () {
        //
		// start scanning twitter for tweets about certain pokemons to compute sentiment analysis by periodically querying twitter search api
		//
		hashPokemonGo.TwitterSentimentsMiner.start(twitterClient, "mongodb://localhost:27017/PokeData", 1000); // Mine every minute, so it takes about 2,5 hours to mine all pokemons

		//
		// WebSocket connections for twitter live sentiment feed and mob detection
		//

		hashPokemonGo.SentimentFeed({io: io}).startSentimentFeed(twitterStreamForHashPokemonGo);
		hashPokemonGo.MobDetection({io: io}).startPokeMobDetection(twitterStreamForHashPokemonGo, function (error) {
			logger.error(error);
		});
    }
};