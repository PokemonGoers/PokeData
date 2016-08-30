"use strict";

let fs = require('fs'),
    pokemon = require(__resourcebase + '/pokemonGoData.json');
    const basicPokemonDetail = require(__appbase + '/models/pokemon');

module.exports = {

    insertToDb: function () {


        logger.info('Loading Basic Pokemon Details');
        let len = pokemon.length;
        for (var i = 0; i < len; i++) {
            var base = new basicPokemonDetail();
            base.name = pokemon[i].Name;
            base.number = pokemon[i].Number;
            base.classification = pokemon[i].Classification;
            base.types = [];
            let typeLength = pokemon[i].Types.length;
            for (var j = 0; j < typeLength; j++) {
                base.types.push(pokemon[i].Types[j]);

            }

            base.resistant = [];
            let resistantLength = pokemon[i].Resistant.length;
            for (var k = 0; k < resistantLength; k++) {
                base.resistant.push(pokemon[k].Resistant[k]);

            }

            base.weaknesses = [];
            let weaknessLength = pokemon[i].Weaknesses.length;
            for (var j = 0; j < weaknessLength; j++) {
                base.weaknesses.push(pokemon[i].Weaknesses[j]);
            }

            base.fastAttacks = [];
            let fastAttackLength = pokemon[i].fastAttacks.length;
            for (var j = 0; j < fastAttackLength; j++) {
                base.fastAttacks.push(pokemon[i].fastAttacks[j]);
            }

            base.specialAttacks = [];
            let specialAttackLength = pokemon[i].specialAttacks.length;
            for (var j = 0; j < specialAttackLength; j++) {
                base.specialAttacks.push(pokemon[i].specialAttacks[j]);
            }

            base.weight = pokemon[i].weight;
            base.height = pokemon[i].height;
            base.fleeRate = pokemon[i].FleeRate;
            base.maxCP = pokemon[i].MaxCP;
            base.maxHP = pokemon[i].MaxHP;
            base.gender = pokemon[i].gender;
            if (pokemon[i].nextEvolutions !== undefined) {
                base.nextEvolutions = [];
                let nextEvoultionlen = pokemon[i].nextEvolutions.length;
                for (var j = 0; j < nextEvoultionlen; j++) {
                    base.nextEvolutions.push(pokemon[i].nextEvolutions[j]);
                }
            }
            if (pokemon[i].previousEvolutions !== undefined) {
                base.previousEvolutions = [];
                let previousEvoultionlen = pokemon[i].previousEvolutions.length;
                for (var j = 0; j < previousEvoultionlen; j++) {
                    base.previousEvolutions.push(pokemon[i].previousEvolutions[j]);
                }

            }
            base.save(function (err) {
                if (err) {
                    logger.error("Error");
                } else {
                    logger.info("Success");
                }
            });

        }

    }
};
