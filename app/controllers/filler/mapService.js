"use strict";

const service = require(__appbase + 'services/mapService');

module.exports = {
    /*
     * for inserting pokemon data to MongoDB
     */
    insertToDb: function () {
        service.search();
    }
};
