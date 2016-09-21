# PokeData

[![Build Status](https://travis-ci.org/PokemonGoers/PokeData.svg?branch=develop)](https://travis-ci.org/PokemonGoers/PokeData)[![Join the chat at https://gitter.im/pokemongoers/PokeData](https://badges.gitter.im/pokemongoers/PokeData.svg)](https://gitter.im/pokemongoers/PokeData?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

## API Documentation
 A detailed documentation of the API is available [here](http://pokedata.c4e3f8c7.svc.dockerapp.io:65014/doc/).
 
## API Demo
 A demo of our API can also be found [here](http://pokedata.c4e3f8c7.svc.dockerapp.io:65014/doc/).
 
## Data Sources
 Data accessible through the API has been extracted from these sources:
  - [Twitter](https://twitter.com/)
  - [PokeSniper](https://pokesnipers.com)
  - [PokeRadar](https://www.pokeradar.io)
  - [Skiplagged](https://skiplagged.com/catch-that)
  - [PokeCrew](https://www.pokecrew.com)
  - [PokeZZ](http://pokezz.com/)
  - [PokeDexs](https://pokedexs.com/)
  - [FastPokeMap](https://fastpokemap.se/)
  - [PokeMap](https://www.pokemap.net/)

## Build pokemon database and listen for pokemon sightings

## To run locally without docker

- Clone this repo
- To run locally, mongodb is required, use 'mongod' to do so (standard port 27017, no credentials)
- change the script part of package.json to the following
- then start listeners to fill the DB, build the pokemon collection (see below) and run "npm start" to expose the API on `localhost:8080`
```
"scripts": {
    "start" : "node app.js",
    "listen": "node scripts/listen.js",
    "build" : "node scripts/build.js",
    "test"  : "node test/main.js"
  }
```
## Build pokemon database
```
npm run build --collection=pokemon
```

## Listen for PokemonSightings

- Listen for pokemon sightings

```
// data-source-name - rarePokemon, pokeRadar, skiplagged, pokecrew, fastpokemap, pokezz, pokedexs, pokemap
npm run listen -collection=<data-source-name>
```

- Listen for Twitter pokemon sightings:

```
CONSUMER_KEY=<CONSUMER_KEY> CONSUMER_SECRET=<CONSUMER_SECRET> ACCESS_TOKEN=<ACCESS_TOKEN> ACCESS_TOKEN_SECRET=<ACCESS_TOKEN_SECRET> NODE_ENV=<NODE_ENV> npm run listen -collection=twitter
```

- CONSUMER_KEY, CONSUMER_SECRET, ACCESS_TOKEN, ACCESS_TOKEN_SECRET - keys provided by twitter (https://apps.twitter.com/)

## To run in production
- To use mlab as a database, get the username, password, uri and the collection name.

## Build pokemon database

```
MLAB_USERNAME=<MLAB_USERNAME> MLAB_PASSWORD=<MLAB_PASSWORD> MLAB_URI=<MLAB_URI> MLAB_COLLECTION=<MLAB_COLLECTION> npm run build -collection=pokemon
```
## Listen for PokemonSightings

- Listen for pokemon sightings

```
// data-source-name - rarePokemon, pokeRadar, skiplagged, pokecrew, fastpokemap, pokezz, pokedexs, pokemap
MLAB_USERNAME=<MLAB_USERNAME> MLAB_PASSWORD=<MLAB_PASSWORD> MLAB_URI=<MLAB_URI> MLAB_COLLECTION=<MLAB_COLLECTION> npm run listen -collection=<data-source-name>
```

- Listen for Twitter pokemon sightings:

```
MLAB_USERNAME=<MLAB_USERNAME> MLAB_PASSWORD=<MLAB_PASSWORD> MLAB_URI=<MLAB_URI> MLAB_COLLECTION=<MLAB_COLLECTION> CONSUMER_KEY=<CONSUMER_KEY> CONSUMER_SECRET=<CONSUMER_SECRET> ACCESS_TOKEN=<ACCESS_TOKEN> ACCESS_TOKEN_SECRET=<ACCESS_TOKEN_SECRET> NODE_ENV=<NODE_ENV> npm run listen -collection=twitter
```

- CONSUMER_KEY, CONSUMER_SECRET, ACCESS_TOKEN, ACCESS_TOKEN_SECRET - keys provided by twitter (https://apps.twitter.com/)

## Docker Build

 To build the project using Docker, follow these steps.
 
 1. Execute the following commands in the terminal.

  
  ```bash
  #!/bin/bash
  
  # Stop all containers
  docker stop $(docker ps -a -q)
  
  # Delete all containers
  docker rm $(docker ps -a -q)
  
  # Delete all images
  docker rmi $(docker images -q)
  
  # Run the latest build from the develop branch
  docker run --env-file <PATH_TO_ENV_FILE> -p 49160:8080 --name <CONTAINER_NAME> 
             -d pokemongoers/pokedata:develop npm start
  
  # Check the status of the container
  docker ps
  
  ```

 2. The application can be accessed at the URL `HOST_IP:49160`.

##Config
There is a configuration file `config.js` in the root folder.
If you don't want to pass parameters for DB connection and twitter credentials everytime you can adapt it.
Just replace the `process.env.*` with the desired value. The `"database"` key is  development mode, `"shared_database"` for production mode and `"twitter"` holds the twitter information.

##Contributors
- swathi-ssunder
- samitsv
- vivek-sethia
- jonas-he
- fabe85
