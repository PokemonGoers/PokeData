"use strict";

const _ = require('underscore'),
    pokemonModel = require(__appbase + 'models/pokemon'),
    Pokemon = pokemonModel.getSchema(),
    PokemonIcon = require(__appbase + 'models/pokemonIcon');

module.exports = {
    /*
     * fetching the particular pokemon details
     */
    get: function (data, callback) {
        Pokemon.find(data, function (err, obj) {
            if (!obj || err) {// already existing data and return 0 for indicating
                let error = err && err.message;
                callback(0, error || data);
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
     * get the distance between a pair of strings
     */
    getStrDistance: function (str1, str2) {
        str1 = str1.toLowerCase();
        str2 = str2.toLowerCase();
        let dist = 0;

        if (str2.length > str1.length) {
            let temp = str1;
            str1 = str2;
            str2 = temp;
        }
        let str_length = str1.length;
        for (let i = 0; i < str_length; i++) {
            if (str2[i] && str2[i] !== str1[i]) {
                dist++;
            }
        }
        return dist;
    },
    /*
     * searching the pokemon details by closest name
     */
    getClosest: function (name, data, callback) {
        name = name.toLowerCase();

        /*Filter the records that match the first 3 characters of the query*/
        let data_clone = _.filter(data, function (datum) {
            let datumName = datum.name.toLowerCase();
            return datum.name.length > 3 && name.substring(0, 2) === datumName.substring(0, 2);
        });
        /*Loop through the data and compute the distance between the query and each name value in the data*/
        data_clone.forEach(function (pokemon) {
            let pokemonName = pokemon.name.toLowerCase();
                pokemon.distance = this.getStrDistance(name, pokemonName);
        }.bind(this));

        /*Sort the data in ascending order of distance*/
        data_clone = _.sortBy(data_clone, "distance");
        /*Select the first 3 data records (3 records that are closest to the query).
        * Remove the "distance"  */
        let matches = _.map(_.first(data_clone, 3), function (match) {
            return match;//_.omit(match, "distance");
        });
        callback(1, matches);
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
        this.get({'name': new RegExp('^.*' + name + '.*$', 'i')}, function (status, response) {
            /*If no records were found matching the name, get the closest matches by performing a Fuzzy string matching*/
            if (status === 1 && _.isEmpty(response) && name.length > 3) {
                /*Retrieve all records from the database*/
                this.getAll(function (status, response) {
                    if (status === 1) {
                        /*Get the closest matches for the specified name*/
                        this.getClosest(name, response, function (status, response) {
                            callback(status, response);
                        });
                    } else {
                        callback(status, response);
                    }
                }.bind(this));
            } else {
                callback(status, response);
            }
        }.bind(this));
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
        this.get({'fastAttacks.type': new RegExp('^' + type + '$', 'i')}, function (status, response) {
            callback(status, response);
        });
    },
    getBySpecialAttackType: function (type, callback) {
        this.get({'specialAttacks.type': new RegExp('^' + type + '$', 'i')}, function (status, response) {
            callback(status, response);
        });
    },
    getByFastAttackName: function (name, callback) {
        this.get({'fastAttacks.name': new RegExp('^' + name + '$', 'i')}, function (status, response) {
            callback(status, response);
        });
    },
    getBySpecialAttackName: function (name, callback) {
        this.get({'specialAttacks.name': new RegExp('^' + name + '$', 'i')}, function (status, response) {
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
        query = pokemonModel.getMappedModel(query);
        query = _.omit(query, function(value) {
            return _.isUndefined(value) || _.isNull(value);
        });
        this.get(query, function (status, response) {
            callback(status, response);
        });
    }
};