// Required for WebSocket connection
const hashPokemonGo = require('hashpokemongo'),
    TwitterModule = require("twitter"),
    config = require(__base + 'config'),
    common = require(__base + 'app/services/common'),
    io = require('socket.io')(config.hashPokemonGoWebSocketPort),
    pokemonSearchTerms = config.twitterKeyWords,
    database = require(__appbase + 'services/database');

const twitterOptions = {
    consumer_key: config.twitter.consumer_key,
    consumer_secret: config.twitter.consumer_secret,
    access_token_key: config.twitter.token,
    access_token_secret: config.twitter.token_secret
};

var pokemonNameList = common.getPokemonNameList();
if(pokemonNameList) {
    logger.info('Got pokemon name list');
}
var listenFor =  config.twitterKeyWords + "," + pokemonNameList.join(",");

const twitterClient = new TwitterModule(twitterOptions);

const pokemonNames = config.pokemonNames;
const twitterStreamForHashPokemonGo = twitterClient.stream('statuses/filter', {track: listenFor});

module.exports = {
    insertToDb : function () {
        //
		// start scanning twitter for tweets about certain pokemons to compute sentiment analysis by periodically querying twitter search api
		// 
		hashPokemonGo.TwitterSentimentsMiner.start(twitterClient, database.getMongoDbUrl(), 1 * 6 * 1000); // Mine every minute, so it takes about 2,5 hours to mine all pokemons

		//
		// WebSocket connections for twitter live sentiment feed and mob detection
		//

		hashPokemonGo.SentimentFeed({io: io}).startSentimentFeed(twitterStreamForHashPokemonGo);
		hashPokemonGo.MobDetection({io: io}).startPokeMobDetection(twitterStreamForHashPokemonGo, function (error) {
			logger.error(error);
		});
    }
};