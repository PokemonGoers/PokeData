module.exports = {
    "database": {
        "username": process.env.DB_USERNAME || "",
        "password": process.env.DB_PASSWORD || "",
        "port": process.env.DB_PORT || "27017",
        "uri": process.env.DB_URI || "localhost",
        "collection": process.env.DB_COLLECTION || "PokeData"
    },
    "shared_database": {
        "username": process.env.MLAB_USERNAME,
        "password": process.env.MLAB_PASSWORD,
        "uri": process.env.MLAB_URI,
        "collection": process.env.MLAB_COLLECTION
    },
    "twitter": {
        "consumer_key": process.env.CONSUMER_KEY,
        "consumer_secret": process.env.CONSUMER_SECRET,
        "token": process.env.ACCESS_TOKEN,
        "token_secret": process.env.ACCESS_TOKEN_SECRET
    },
    "pokemonDataSources": {
        "twitter": "TWITTER",
        "pokesniper": "POKESNIPER",
        "pokeRadar": "POKERADAR",
        "skiplagged": "SKIPLAGGED",
        "pokecrew": "POKECREW",
        "fastpokemap": "FASTPOKEMAP",
        "pokezz": "POKEZZ",
        "pokedexs": "POKEDEXS",
        "pokemap": "POKEMAP"
    },
    "sourceToFiller": {
        "twitter": "twitter",
        "rarePokemon": "rarePokemon",
        "pokeRadar": "mapService",
        "skiplagged": "mapService",
        "pokecrew": "mapService",
        "fastpokemap": "mapService",
        "pokezz": "webSocket",
        "pokedexs": "webSocket",
        "pokemap": "mapService",
        "hashPokemonGo": "hashPokemonGo",
    },
    "twitterKeyWords": 'caught #pokemongo,saw #pokemongo,found #pokemongo,appeared #pokemongo,attacked #pokemongo,pokemon catch,pokemon saw,pokemon attack,pokemon find,pokemon caught,pokemon attacked,pokemon found,pokemon appeared,#foundPokemon,#caughtPokemon,#pokemongo,a wild appeared until #pokemongo',
    "pokemonNames": '"bulbasaur, ivysaur, venusaur, charmander, charmeleon, charizard, squirtle, wartortle, blastoise, caterpie, metapod, butterfree, weedle, kakuna, beedrill, pidgey, pidgeotto, pidgeot, rattata, raticate, spearow, fearow, ekans, arbok, pikachu, raichu, sandshrew, sandslash, nidoran ♀, nidorina, nidoqueen, nidoran ♂, nidorino, nidoking, clefairy, clefable, vulpix, ninetales, jigglypuff, wigglytuff, zubat, golbat, oddish, gloom, vileplume, paras, parasect, venonat, venomoth, diglett, dugtrio, meowth, persian, psyduck, golduck, mankey, primeape, growlithe, arcanine, poliwag, poliwhirl, poliwrath, abra, kadabra, alakazam, machop, machoke, machamp, bellsprout, weepinbell, victreebel, tentacool, tentacruel, geodude, graveler, golem, ponyta, rapidash, slowpoke, slowbro, magnemite, magneton, farfetchd, doduo, dodrio, seel, dewgong, grimer, muk, shellder, cloyster, gastly, haunter, gengar, onix, drowzee, hypno, krabby, kingler, voltorb, electrode, exeggcute, exeggutor, cubone, marowak, hitmonlee, hitmonchan, lickitung, koffing, weezing, rhyhorn, rhydon, chansey, tangela, kangaskhan, horsea, seadra, goldeen, seaking, staryu, starmie, mr. mime, scyther, jynx, electabuzz, magmar, pinsir, tauros, magikarp, gyarados, lapras, ditto, eevee, vaporeon, jolteon, flareon, porygon, omanyte, omastar, kabuto, kabutops, aerodactyl, snorlax, articuno, zapdos, moltres, dratini, dragonair, dragonite, mewtwo, mew',
    "pokesniper": {
        "url": "https://pokesnipers.com/api/v1/pokemon.json?referrer=home",
        "listeningInterval": 600000 // 10 minutes in milliseconds
    },
    "pokemonSpawnTime": 900000,// 15 minutes in milliseconds,
    "limit": 2500,
    "server": {
        "port": "8080"
    },
    "pokeRadar": {
        "host": "www.pokeradar.io",
        "path": "/api/v1/submissions"
    },
    "skiplagged": {
        "host": "skiplagged.com",
        "path": "/api/pokemon.php"
    },
    "pokecrew": {
        "host": "api.pokecrew.com",
        "path": "/api/v1/seens"
    },
    "fastpokemap": {
        "host": "cache.fastpokemap.se",
        "path": "/"
    },
    "pokezz": {
        "host": "pokezz.com",
        "path": "/socket.io/?EIO=3&transport=websocket"
    },
    "pokedexs": {
        "host": "pokedexs.com",
        "path": "/socket.io/?EIO=3&transport=websocket"
    },
    "pokemap": {
        "host": "www.pokemap.net",
        "path": "/api/mewto.php"
    },
    "hashPokemonGoWebSocketPort": 3322
};