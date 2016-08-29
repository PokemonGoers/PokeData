module.exports = {
    "database" : {
        "username": "",
        "password": "",
        "port": "27017",
        "uri": "localhost",
        "collection": "PokeData"
    },
    "shared_database": {
        "username": "pokemongo",
        "password": "!Pokemon123",
        "uri": "ds063725.mlab.com:63725/pokemongo",
        "collection": "PokeData"
    },
    "twitter" : {
        "consumer_key": process.env.CONSUMER_KEY,
        "consumer_secret": process.env.CONSUMER_SECRET,
        "token": process.env.ACCESS_TOKEN,
        "token_secret": process.env.ACCESS_TOKEN_SECRET
    },
    "pokemonDataSources": {
        "twitter": "TWITTER",
        "pokesniper" : "POKESNIPER"
    },
    "twitterKeyWords" : 'caught #pokemongo,saw #pokemongo,found #pokemongo,appeared #pokemongo,attacked #pokemongo,pokemon catch,pokemon saw,pokemon attack,pokemon find,pokemon caught,pokemon attacked,pokemon found,pokemon appeared,#foundPokemon,#caughtPokemon,#pokemongo,a wild appeared until #pokemongo',
    "pokesniper":{
        "url" : "https://pokesnipers.com/api/v1/pokemon.json?referrer=home",
        "listeningInterval" : 600000 // 10 minutes in milliseconds
    },
    "pokemonSpawnTime" : 900 ,// 15 minutes in seconds
    "server":{
        "port": "8080"
    }
};