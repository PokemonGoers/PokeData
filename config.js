module.exports = {
    "database" : {
        "username": "",
        "password": "",
        "port": "27017",
        "uri": "localhost",
        "collection": "PokeData"
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
        "twitter": "TWITTER"
    },
    "twitterKeyWords" : 'pokemon catch,pokemon saw,pokemon attack,pokemon find,pokemon caught,pokemon attacked,pokemon found,pokemon appeared,#foundPokemon,#caughtPokemon,#pokemongo,a wild appeared until #pokemongo',
    "pokesniper": {
        "url" : "https://pokesnipers.com/api/v1/pokemon.json?referrer=home",
        "listeningInterval" : 600000 // 10 minutes in milliseconds
    },
    "pokemonSpawnTime" : 900 ,// 15 minutes in seconds
    "server": {
        "port": "8080"
    },
    "pokeRadar": {
        "host": "www.pokeradar.io",
        "path": "/api/v1/submissions"
    }
};