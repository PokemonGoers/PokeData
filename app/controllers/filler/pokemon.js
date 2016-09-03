"use strict";

let fs = require('fs'),
    pokemon = require(__resourcebase + '/pokemonGoData.json'),
    pokemonIconDir = __resourcebase + '../pokemonIcons/';
    const Pokemon = require(__appbase + '/models/pokemon'),
          PokemonIcon = require(__appbase + '/models/pokemonIcon')

module.exports = {

    insertToDb: function () {

        logger.info('Loading Basic Pokemon Details');
        let len = pokemon.length;
        for (var i = 0; i < len; i++) {

            var base = new Pokemon();
            var pokemonIcon = new PokemonIcon();

            base.pokemonId = Number(pokemon[i]['Number']);
            base.name = pokemon[i]['Name'];
            base.classification = pokemon[i]['Classification'];

            base.types = [];
            let typeLength = pokemon[i]['Types'].length;
            for (let j = 0; j < typeLength; j++) {
                base.types.push(pokemon[i]['Types'][j].toLowerCase());
            }

            base.resistance = [];
            let resistanceLength = pokemon[i]['Resistant'].length;
            for (let j = 0; j < resistanceLength; j++) {
                base.resistance.push(pokemon[i]['Resistant'][j].toLowerCase());
            }

            base.weakness = [];
            let weaknessLength = pokemon[i]['Weaknesses'].length;
            for (let j = 0; j < weaknessLength; j++) {
                base.weakness.push(pokemon[i]['Weaknesses'][j].toLowerCase());
            }

            base.fastAttacks = [];
            let fastAttackLength = pokemon[i]['Fast_Attacks'].length;
            for (let j = 0; j < fastAttackLength; j++) {
                let fastAttack = pokemon[i]['Fast_Attacks'][j],
                    attack = {
                        'type': fastAttack['Type'],
                        'name': fastAttack['Name'],
                        'damage': fastAttack['Damage']
                    };
                base.fastAttacks.push(attack);
            }

            base.specialAttacks = [];
            let specialAttackLength = pokemon[i]['Special_Attacks'].length;
            for (let j = 0; j < specialAttackLength; j++) {
                let specialAttack = pokemon[i]['Special_Attacks'][j],
                    attack = {
                        'type': specialAttack['Type'],
                        'name': specialAttack['Name'],
                        'damage': specialAttack['Damage']
                    };
                base.specialAttacks.push(attack);
            }

            let weight = pokemon[i]['Weight'];
            base.weight = {
                'maximum': weight['Maximum'],
                'minimum': weight['Minimum']
            };

            let height = pokemon[i]['Height'];
            base.height = {
                'maximum': height['Maximum'],
                'minimum': height['Minimum']
            };

            base.fleeRate = pokemon[i]['FleeRate'];
            base.maxCP = pokemon[i]['MaxCP'];
            base.maxHP = pokemon[i]['MaxHP'];

            let gender = pokemon[i]['gender'];
            base.gender = {
                'abbreviation': gender['abbreviation'],
                'maleRatio': Number(gender['male_ratio']),
                'femaleRatio': Number(gender['female_ratio']),
                'breedable': gender['breedable']
            };

            if (pokemon[i]['Next_evolutions'] !== undefined) {
                base.nextEvolutions = [];
                let nextEvoultionlen = pokemon[i]['Next_evolutions'].length;
                for (let j = 0; j < nextEvoultionlen; j++) {
                    let next = pokemon[i]['Next_evolutions'][j],
                        evolution = {
                            'pokemonId': Number(next['Number']),
                            'name': next['Name']
                        };
                    base.nextEvolutions.push(evolution);
                }
            }
            if (pokemon[i]['Previous_evolutions'] !== undefined) {
                base.previousEvolutions = [];
                let previousEvoultionlen = pokemon[i]['Previous_evolutions'].length;
                for (let j = 0; j < previousEvoultionlen; j++) {
                    let prev = pokemon[i]['Previous_evolutions'][j],
                        evolution = {
                        'pokemonId': Number(prev['Number']),
                        'name': prev['Name']
                    };
                    base.previousEvolutions.push(evolution);
                }

            }

            base.save(function (err) {
                if (err) {
                    logger.error("Error in insertion");
                } else {
                    logger.success("Insertion Successful");
                }
            });

            let iconPath = pokemonIconDir + base.name.toLowerCase() + '.gif';
            let data = fs.readFileSync(iconPath);
            pokemonIcon.pokemonId = Number(pokemon[i]['Number']);
            pokemonIcon.icon.data = new Buffer(data).toString('base64');
            pokemonIcon.icon.contentType = 'image/gif';
            pokemonIcon.save(function (err) {
                if (err) {
                    logger.error("Error in insertion");
                } else {
                    logger.success("Insertion Successful");
                }
            });
        }
    }
};
