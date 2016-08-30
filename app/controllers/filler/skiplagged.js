"use strict";

const pokeRadar = require(__appbase + 'services/skiplagged');

module.exports = {
    /*
     * for inserting pokemon data to MongoDB
     */
    insertToDb: function () {
        pokeRadar.search();
    }
};
