'use strict';

const {createLogger, format, transports} = require('winston');
const {LoggingWinston} = require('@google-cloud/logging-winston');
const expressWinston = require('express-winston');
const path = require('path');


const transportsInstances = [];
if (process.env.APP_ENV === 'prod') {
    transportsInstances.push(new LoggingWinston());
} else {
    transportsInstances.push(new transports.Console());
}

const options = {
    level: process.env.APP_LOG_LEVEL ||
        (process.env.APP_ENV === 'prod' ? 'info' : 'debug'),
    transports: transportsInstances,
    format: format.combine(
        format.label({label: path.basename(process.mainModule.filename)}),
        format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
        format.printf(
            (info) => `${info.timestamp} ${info.level} [${info.label}]:` +
                `${info.message}`,
        ),
    ),
};

const optionsHttp = {
    transports: transportsInstances,
    metaField: null, // store metadata at the root of the log entry
    responseField: null, // prevents the res from being included in the metadata
    requestWhitelist: ['headers', 'query'],
    responseWhitelist: ['body'], // populates res.body to get the response size
    dynamicMeta: (req, res) => {
        const httpRequest = {};
        const meta = {};
        if (req) {
            meta.httpRequest = httpRequest;
            httpRequest.requestMethod = req.method;
            httpRequest.requestUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
            httpRequest.protocol = `HTTP/${req.httpVersion}`;
            httpRequest.remoteIp = req.ip.indexOf(':') >= 0 ?
                req.ip.substring(req.ip.lastIndexOf(':') + 1) :
                req.ip; // just ipv4
            httpRequest.requestSize = req.socket.bytesRead;
            httpRequest.userAgent = req.get('User-Agent');
            httpRequest.referrer = req.get('Referrer');
        }

        if (res) {
            meta.httpRequest = httpRequest,
            httpRequest.status = res.statusCode,
            httpRequest.latency = {
                seconds: Math.floor(res.responseTime / 1000),
                nanos: (res.responseTime % 1000) * 1000000,
            };
            if (res.body) {
                if (typeof res.body === 'object') {
                    httpRequest.responseSize = JSON.stringify(res.body).length;
                } else if (typeof res.body === 'string') {
                    httpRequest.responseSize = res.body.length;
                }
            }
        }
        return meta;
    },
};

const optionsError = {
    transports: transportsInstances,
    msg: 'ERROR: {{err.message}} {{res.statusCode}} {{req.method}}',
    format: format.combine(
        format.json(),
    ),
};

const logger = createLogger(options);
const loggerHttp = expressWinston.logger(optionsHttp);
const loggerError = expressWinston.errorLogger(optionsError);

module.exports = {
    logger,
    loggerHttp,
    loggerError,
};
