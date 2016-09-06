"use strict";

const Pokemon = require(__appbase + 'models/pokemon'),
      PokemonIcon = require(__appbase + 'models/pokemonIcon');

module.exports = {
    /*
     * fetching the particular pokemon details
     */
    get: function (data, callback) {
        Pokemon.find(data, function (err, obj) {
            if (!obj || err) {// already existing data and return 0 for indicating
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
        this.get(undefined, function (status, response) {
            callback(status, response);
        });
    },

    /*
     * searching the pokemon details by Id
     */
    getById: function (id, callback) {
        this.get({'pokemonId': id}, function (status, response) {
            callback(status, response);
        });
    },
    /*
     * searching the pokemonIcon details by Id
     */
    getIconById: function (id, callback) {
        PokemonIcon.find({'pokemonId': id}, function (err, obj) {
            if (!obj || obj.length === 0 || err) {// already existing data and return 0 for indicating
                callback(0, obj);
            } else { // new data and return 1 for indicating
                callback(1, obj);
            }
        });
    },
    /*
     * get the pokemon details of particular pokemon based on gender
     */
    getByGender : function (gender, callback) {
        this.get({'gender.abbreviation': gender.toLowerCase()}, function (status, response) {
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
     * get the pokemon details of particular pokemon based on type
     */
    getByType : function (type, callback) {
        this.get({'types': type.toLowerCase()}, function (status, response) {
            callback(status, response);
        });
    },
    /*
     * get the pokemon details of pokemons based on resistance
     */
    getByResistance: function (resistance, callback) {
        this.get({'resistance': resistance.toLowerCase()}, function (status, response) {
            callback(status, response);
        });
    },

    /*
     * get the pokemon details of pokemons based on weakness
     */
    getByWeakness: function (weakness, callback) {
        this.get({'weakness': weakness.toLowerCase()}, function (status, response) {
            callback(status, response);
        });
    },
    getByFastAttackType: function (type, callback) {
        this.get({'fastAttacks.type': type}, function (status, response) {
            callback(status, response);
        });
    },
    getBySpecialAttackType: function (type, callback) {
        this.get({'specialAttacks.type': type}, function (status, response) {
            callback(status, response);
        });
    },
    getByFastAttackName: function (name, callback) {
        this.get({'fastAttacks.name': name}, function (status, response) {
            callback(status, response);
        });
    },
    getBySpecialAttackName: function (name, callback) {
        this.get({'specialAttacks.name': name}, function (status, response) {
            callback(status, response);
        });
    },
    getByFastAttackDamage: function (damage, callback) {
        this.get({'fastAttacks.damage': damage}, function (status, response) {
            callback(status, response);
        });
    },
    getBySpecialAttackDamage: function (damage, callback) {
        this.get({'specialAttacks.damage': damage}, function (status, response) {
            callback(status, response);
        });
    },
    getByPrevEvolutionId: function (id, callback) {
        this.get({'nextEvolutions.pokemonId': id}, function (status, response) {
            callback(status, response);
        });
    },
    getByNextEvolutionId: function (id, callback) {
        this.get({'previousEvolutions.pokemonId': id}, function (status, response) {
            callback(status, response);
        });
    },
    getByPrevEvolutionName: function (name, callback) {
        this.get({'nextEvolutions.name': name}, function (status, response) {
            callback(status, response);
        });
    },
    getByNextEvolutionName: function (name, callback) {
        this.get({'previousEvolutions.name': name}, function (status, response) {
            callback(status, response);
        });
    },
    search: function (query, callback) {
        this.get(query, function (status, response) {
            callback(status, response);
        });
    }
};