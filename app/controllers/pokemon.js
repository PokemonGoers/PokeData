module.exports = {
    /**
     * @api {get} /api/pokemons/ Get all pokemons
     * @apiVersion 0.0.1
     * @apiName GetAllPokemons
     * @apiDescription Get all pokemons.
     * @apiGroup Pokemons
     *
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * [
     *    {
     *      "_id": "57b60a60f3981b52102ef562",
     *      "deviceId": "80sxy0vumg2h5hhv8hgc0axt9jr29al7",
     *       "userId": "13661365",
     *       "trainerName": "(Poke Radar Prediction)",
     *       "pokemonId": "133",
     *       "longitude": 2.3887459103,
     *       "latitude": 48.8923425896,
     *       "upvotes": 1,
     *       "downvotes": 0,
     *       "created": 1470888182,
     *       "id": "Sybxo5uYt",
     *       "__v": 0
          }
     * ]
     *
     * @apiSuccessExample {json} No db-entries:
     * HTTP/1.1 200 OK
     * [
     * ]
     */
    getAll: function (req, res) {
        console.log('GetAll');
        var pokemonStore = require('../stores/pokemon');

        pokemonStore.getAll(function(success,pokemons) {
            console.log(pokemons)
            res.status(200).json(pokemons);
        });
    }
};