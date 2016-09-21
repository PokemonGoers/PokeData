"use strict";

require(__dirname + '/../' + 'constants');
const config = require(__base + 'config');
const hashPokemonGo = require('hashpokemongo');
const Twitter = require("twitter");


logger.info(collection);
/*
 * choices of collection to be filled
 */
var possibleListeners = [
    'rarePokemon',
    'pokeRadar',
    'twitter',
    'skiplagged',
    'pokecrew',
    'fastpokemap',
    'pokezz',
    'pokedexs',
    'pokemap'
];

// when the choices of collection to be filled doesn't match, then exit the process
if (possibleListeners.indexOf(collection) < 0) {
    process.exit();
}

database.connect(function (db) {
    /*The DB connection is open*/
    db.on('open', function () {
        // listener for pokemons
        const listener = require(__base + 'app/controllers/filler/' + config.sourceToFiller[collection]);
        listener.insertToDb(function () {
            return;
        });
    });
});


//
// start scanning twitter for tweets about certain pokemons to compute sentiment analysis by periodically querying twitter search api
//
const twitterOptions = {
    consumer_key: config.twitter.consumer_key,
    consumer_secret: config.twitter.consumer_key,
    access_token_key: config.twitter.token,
    access_token_secret: config.twitter.token_secret
};
const twitterClient = new Twitter(twitterOptions);

hashPokemonGo.TwitterSentimentsMiner.start(twitterClient, config.shared_database.uri, 1 * 60 * 1000); // Mine every minute, so it takes about 2,5 hours to mine all pokemons

//
// WebSocket connections for twitter live sentiment feed and mob detection
//
const io = require('socket.io')(config.hashPokemonGoWebSocketPort);
const pokemonSearchTerms = 'caught #pokemongo,saw #pokemongo,found #pokemongo,appeared #pokemongo,attacked #pokemongo,pokemon catch,pokemon saw,pokemon attack,pokemon find,pokemon caught,pokemon attacked,pokemon found,pokemon appeared,#foundPokemon,#caughtPokemon,#pokemongo,a wild appeared until #pokemongo';
const pokemonNames = "bulbasaur, ivysaur, venusaur, charmander, charmeleon, charizard, squirtle, wartortle, blastoise, caterpie, metapod, butterfree, weedle, kakuna, beedrill, pidgey, pidgeotto, pidgeot, rattata, raticate, spearow, fearow, ekans, arbok, pikachu, raichu, sandshrew, sandslash, nidoran ♀, nidorina, nidoqueen, nidoran ♂, nidorino, nidoking, clefairy, clefable, vulpix, ninetales, jigglypuff, wigglytuff, zubat, golbat, oddish, gloom, vileplume, paras, parasect, venonat, venomoth, diglett, dugtrio, meowth, persian, psyduck, golduck, mankey, primeape, growlithe, arcanine, poliwag, poliwhirl, poliwrath, abra, kadabra, alakazam, machop, machoke, machamp, bellsprout, weepinbell, victreebel, tentacool, tentacruel, geodude, graveler, golem, ponyta, rapidash, slowpoke, slowbro, magnemite, magneton, farfetch'd, doduo, dodrio, seel, dewgong, grimer, muk, shellder, cloyster, gastly, haunter, gengar, onix, drowzee, hypno, krabby, kingler, voltorb, electrode, exeggcute, exeggutor, cubone, marowak, hitmonlee, hitmonchan, lickitung, koffing, weezing, rhyhorn, rhydon, chansey, tangela, kangaskhan, horsea, seadra, goldeen, seaking, staryu, starmie, mr. mime, scyther, jynx, electabuzz, magmar, pinsir, tauros, magikarp, gyarados, lapras, ditto, eevee, vaporeon, jolteon, flareon, porygon, omanyte, omastar, kabuto, kabutops, aerodactyl, snorlax, articuno, zapdos, moltres, dratini, dragonair, dragonite, mewtwo, mew";
const stream = twitterClient.stream('statuses/filter', {track: pokemonSearchTerms + "," + pokemonNames});

hashPokemonGo.SentimentFeed({io: io}).startSentimentFeed(stream);
hashPokemonGo.MobDetection({io: io}).startPokeMobDetection(stream, function (error) {
    logger.error(error);
});