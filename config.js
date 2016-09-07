module.exports = {
    "database" : {
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
    "twitter" : {
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
        "fastpokemap": "FASTPOKEMAP"
    },
    "sourceToFiller": {
        "twitter": "twitter",
        "rarePokemon": "rarePokemon",
        "pokeRadar": "mapService",
        "skiplagged": "mapService",
        "pokecrew": "mapService",
        "fastpokemap": "mapService"
    },
    "twitterKeyWords" : 'caught #pokemongo,saw #pokemongo,found #pokemongo,appeared #pokemongo,attacked #pokemongo,pokemon catch,pokemon saw,pokemon attack,pokemon find,pokemon caught,pokemon attacked,pokemon found,pokemon appeared,#foundPokemon,#caughtPokemon,#pokemongo,a wild appeared until #pokemongo',
    "pokesniper":{
        "url" : "https://pokesnipers.com/api/v1/pokemon.json?referrer=home",
        "listeningInterval" : 600000 // 10 minutes in milliseconds
    },
    "pokemonSpawnTime" : 900000 ,// 15 minutes in milliseconds
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
    }
};