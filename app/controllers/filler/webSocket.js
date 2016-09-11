"use strict";

const service = require(__appbase + 'services/webSocket');

module.exports = {
    /*
     * for inserting pokemon data to MongoDB
     */
    insertToDb: function () {
        service.listen();
    }
};
