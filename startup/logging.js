require('express-async-errors');
const winston = require('winston');

module.exports = function () {
    process.on('unhandledRejection', (ex) => {
        throw ex;
    })
    winston.exceptions.handle(
        [new winston.transports.Console({ colorize: true, prettyPrint: true }),
        new winston.transports.File({ filename: 'Logs/Exceptions.log', level: 'error' })]
    );
    winston.add(new winston.transports.File(
        { filename: 'Logs/Info.log' }
    ));
}