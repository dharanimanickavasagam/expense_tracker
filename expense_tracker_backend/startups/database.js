const winston = require("winston")
const mongoose = require('mongoose');

module.exports = function () {

    // generic connection to mongodb database ExpenseTracker 
    mongoose.connect("mongodb://localhost/ExpenseTracker")
        .then(() => winston.info("Connected to the Database"))
        .catch(ex => winston.warn("Cannot to Database", ex));
}