module.exports = {
    "database" : {
        "username": "",
        "password": "",
        "port": "27017",
        "uri": "localhost",
        "collection": "PokeData"
    },
    "shared_database": {
        "username": "MLAB_USERNAME_HERE",
        "password": "MLAB_PASSWORD_HERE",
        "uri": "ds063725.mlab.com:63725/pokemongo",
        "collection": "PokeData"
    },
    "twitter" : {
        "consumer_key": process.env.CONSUMER_KEY,
        "consumer_secret": process.env.CONSUMER_SECRET,
        "token": process.env.ACCESS_TOKEN,
        "token_secret": process.env.ACCESS_TOKEN_SECRET
    },
    "server":{
        "port": "8080"
    }
};