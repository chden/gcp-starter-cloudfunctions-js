'use strict';

const winston = require('winston');
// const expressWinston = require('winston-express-middleware');
const {LoggingWinston} = require('@google-cloud/logging-winston');

const loggingWinston = new LoggingWinston();

const logger = winston.createLogger({
    level: 'info',
    transports: [
        new winston.transports.Console(),
        // Add Stackdriver Logging
        loggingWinston,
    ],
    msg: 'HTTP {{req.method}} {{req.url}}',
});


const cors = require('cors')({
    origin: true,
});

exports.main = (req, res) => {
    logger.info('TEST2 WINSTON');
    cors(req, res, () => {});
    res.send('Hello, World!');
};
