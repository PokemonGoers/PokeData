module.exports = {
    /**
     * @api {post} /api/pokemonIcon Add pokemonIcon
     * @apiVersion 0.0.1
     * @apiName Add
     * @apiGroup PokemonIcon  
     *
     * @apiSuccessExample {json} Success-Response
     *     HTTP/1.1 201 OK
     *     {"message" : "Success", "data" : [pokemonIcon]}
     *
     * @apiError (400) message: 'Error. Property not valid to schema.', errorProperty: message 
     * @apiErrorExample {json} NotFound     *      HTTP/1.1 404
     *      { message: 'Failure. No pokemon with that id existing!', data: lookup };
     *
     * */
    add: function(req, res) {
        console.log(req.body);
        var pokemonIconStore = require('../stores/pokemonIcon');
        pokemonIconStore.add(req.body,function(success, message) {
            if(success == 1)
                res.status(200).json({ message: 'Success', data: message });
            else if(success == 2)
                res.status(400).json({ message: 'Error. Property not valid to schema.', errorProperty: message });
            else
                res.status(400).json({ message: 'Error.', error: message });
        });

    },
    getByPokemonId : function (req, res) {
        logger.info('Get Pokemon Icon by Id');
        var pokemonIconStore = require('../stores/pokemonIcon');
        pokemonIconStore.getById(req.params.id, function(success, message) {
            if(success === 1)
                res.status(200).json({message: 'Success', data: message});
            else
                res.status(404).json({message: 'Failure. No pokemon icon with this id exists!', data: {'pokemonId': req.params.id}});
        });
    },
}