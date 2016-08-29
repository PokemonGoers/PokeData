"use strict";

const Pokemon = require(__appbase + 'models/BasicPokemonDetail');

module.exports = {
    /*
     * fetching the particular pokemon details
     */
    get: function (data, callback) {
        Pokemon.find(data, function (err, obj) {
            if (obj.length === 0) {// already existing data and return 0 for indicating
                callback(0, data);
            } else { // new data and return 1 for indicating
                callback(1, obj);
            }
        });
    },

    /*
     * fetching all the pokemon details
     */
    getAll: function (callback) {
        Pokemon.find(function (err, pokemons) {
            if (err)
                callback(false, err);
            else
                callback(true, pokemons);
        });
    },

    /*
     * searching the pokemon details by Id
     */
    getById: function (id, callback) {
        this.get({'pokemonID': id}, function (status, response) {
            callback(status, response);
        });
    },
    /*
     * get the pokemon details of particular pokemon based on gender
     */
    getByGender : function (gender, callback) {
        this.get({'gender.abbreviation': gender}, function (status, response) {
            callback(status, response);
        });
    },
    /*
     * get the pokemon details of particular pokemon based on name
     */
    getByName : function (name, callback) {
        this.get({'name': new RegExp('^' + name + '$', 'i')}, function (status, response) {
            callback(status, response);
        });
    },
    /*
     * get the pokemon details of pokemons based on resistance
     */
    getByResistance: function (resistance, callback) {
        this.get({'resistance': resistance}, function (status, response) {
            callback(status, response);
        });
    },

    /*
     * get the pokemon details of pokemons based on weakness
     */
    getByWeakness: function (weakness, callback) {
        this.get({'weakness': weakness}, function (status, response) {
            callback(status, response);
        });
    }
};