const winston = require("winston");

module.exports = function () {
    winston.add(
        new winston.transports.File({
            filename: 'errorLog.log'
        })
    )

    process.on('unhandledRejection', (ex) => {
        throw ex;
    });

    winston.handleExceptions(

        //console logger 
        new winston.transports.Console({
            colorize: true,
            prettyPrint: true
        }),

        //file logger
        new winston.transports.File({
            filename: 'uncaughtExceptions.log'
        }));

};