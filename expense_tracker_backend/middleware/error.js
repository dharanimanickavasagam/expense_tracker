const winston = require("winston");

function error(err, req, res, next) {
    winston.error(err.message, err);

    // error
    // warn
    // info
    // verbose 
    // debug 
    // silly 

    res.status(500).send("Something went wrong..");
    next();
};

module.exports.error = error