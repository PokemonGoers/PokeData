var mongoose = require('mongoose');
var Schema   = mongoose.Schema;


var pokemonSchema = new Schema({
    id         : {type: String, required: true, unique: true},
    created    : {type: Number},
    downvotes  : {type: Number},
    upvotes    : {type: Number},
    latitude   : {type: Number},
    longitude  : {type: Number},
    pokemonId  : {type: String},
    trainerName: {type: String},
    userId     : {type: String},
    deviceId   : {type: String},
    category   : {type: [Boolean]},
    gender     : {type: String, enum: ['m', 'f', 'u', 'h']},
    weight     : {type: Number},
    height     : {type: Number},
    move       : {type: [Boolean]},
    evolution  : {type: [String]},
    pre_form   : {type: [String]}
});

module.exports = mongoose.model('pokemon', pokemonSchema);