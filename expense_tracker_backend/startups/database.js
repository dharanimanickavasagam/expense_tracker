const winston = require("winston")
const mongoose = require('mongoose');
const config = require("config");

module.exports = function () {

    // generic connection to mongodb database ExpenseTracker 
    mongoose.connect(config.get("database"))
        .then(() => winston.info(`Connected to the Database ${config.get("database")}`))
        .catch(ex => winston.warn("Cannot to Database", ex));
}