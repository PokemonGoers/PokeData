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
            base.Name = pokemon[i].Name;
            base.Number = pokemon[i].Number;
            base.Classification = pokemon[i].Classification;
            base.Types = [];
            let typeLength = pokemon[i].Types.length;
            for (var j = 0; j < typeLength; j++) {
                base.Types.push(pokemon[i].Types[j]);

            }

            base.Resistant = [];
            let resistantLength = pokemon[i].Resistant.length;
            for (var k = 0; k < resistantLength; k++) {
                base.Resistant.push(pokemon[k].Resistant[k]);

            }

            base.Weaknesses = [];
            let weaknessLength = pokemon[i].Weaknesses.length;
            for (var j = 0; j < weaknessLength; j++) {
                base.Weaknesses.push(pokemon[i].Weaknesses[j]);
            }

            base.Fast_Attacks = [];
            let fastAttackLength = pokemon[i].Fast_Attacks.length;
            for (var j = 0; j < fastAttackLength; j++) {
                base.Fast_Attacks.push(pokemon[i].Fast_Attacks[j]);
            }

            base.Special_Attacks = [];
            let specialAttackLength = pokemon[i].Special_Attacks.length;
            for (var j = 0; j < specialAttackLength; j++) {
                base.Special_Attacks.push(pokemon[i].Special_Attacks[j]);
            }

            base.Weight = pokemon[i].Weight;
            base.Height = pokemon[i].Height;
            base.FleeRate = pokemon[i].FleeRate;
            base.MaxCP = pokemon[i].MaxCP;
            base.MaxHP = pokemon[i].MaxHP;
            base.gender = pokemon[i].gender;
            if (pokemon[i].Next_evolutions !== undefined) {
                base.Next_evolutions = [];
                let nextEvoultionlen = pokemon[i].Next_evolutions.length;
                for (var j = 0; j < nextEvoultionlen; j++) {
                    base.Next_evolutions.push(pokemon[i].Next_evolutions[j]);
                }
            }
            if (pokemon[i].Previous_evolutions !== undefined) {
                base.Previous_evolutions = [];
                let previousEvoultionlen = pokemon[i].Previous_evolutions.length;
                for (var j = 0; j < previousEvoultionlen; j++) {
                    base.Previous_evolutions.push(pokemon[i].Previous_evolutions[j]);
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
