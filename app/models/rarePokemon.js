var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var rarePokemonSchema = new Schema({
    id           : {type: Number},
    name         : {type: String},
    coords       : {type: String},
    until        : {type: String},
    icon_url     : {type: String}

});

module.exports = mongoose.model('rarePokemon', rarePokemonSchema);