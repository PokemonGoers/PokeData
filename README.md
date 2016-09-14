# PokeData

[![Build Status](https://travis-ci.org/PokemonGoers/PokeData.svg?branch=develop)](https://travis-ci.org/PokemonGoers/PokeData)[![Join the chat at https://gitter.im/pokemongoers/PokeData](https://badges.gitter.im/pokemongoers/PokeData.svg)](https://gitter.im/pokemongoers/PokeData?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

## API Documentation
 A detailed documentation of the API is available [here](http://pokedata.c4e3f8c7.svc.dockerapp.io:65014/doc/).
 
## Data Sources
 Data accessible through the API has been extracted from these sources:
  - [Twitter](https://twitter.com/)
  - [PokeSniper](https://pokesnipers.com)
  - [PokeRadar](https://www.pokeradar.io)
  - [SkipLagged](https://skiplagged.com/catch-that)
  - [PokeCrew](https://www.pokecrew.com)

# Build pokemon database and listen for pokemon sightings

# To run locally

- To run locally, mongodb is required, use 'mongod' to do so
- change the script part of package.json to the following
```
"scripts": {
    "start": "node app.js",
    "listen": "node scripts/listen.js",
    "build": "node scripts/build.js",
    "test": "node test/main.js"
  }
```
# Build pokemon database
npm run build -collection=pokemon

## Listen for PokemonSightings

- Liste for pokemon sightings

```
npm run listen -collection=<data-source-name>
```
- data-source-name - rarePokemon, pokeRadar, skiplagged, pokecrew, fastpokemap, pokezz, pokedexs, pokemap

- Listen for Twitter pokemon sightings:

```
CONSUMER_KEY=<CONSUMER_KEY> CONSUMER_SECRET=<CONSUMER_SECRET> ACCESS_TOKEN=<ACCESS_TOKEN> ACCESS_TOKEN_SECRET=<ACCESS_TOKEN_SECRET> NODE_ENV=<NODE_ENV> npm run listen -collection=twitter
```

- CONSUMER_KEY, CONSUMER_SECRET, ACCESS_TOKEN, ACCESS_TOKEN_SECRET - keys provided by twitter (https://apps.twitter.com/)

# To run in production

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
