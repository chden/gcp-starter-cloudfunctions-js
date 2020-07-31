'use strict';

const {createLogger, format, transports} = require('winston');
const {LoggingWinston} = require('@google-cloud/logging-winston');
const expressWinston = require('express-winston');
const path = require('path');

const options = {
    level: 'debug',
    transports: [
        // new transports.Console(),
        new LoggingWinston(),
    ],
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
    transports: [new LoggingWinston({})],
    // transports: [new winston.transports.Console()],
    metaField: null, // this causes the metadata to be stored at the root of the log entry
    responseField: null, // this prevents the response from being included in the metadata (including body and status code)
    requestWhitelist: ['headers', 'query'], // these are not included in the standard StackDriver httpRequest
    responseWhitelist: ['body'], // this populates the `res.body` so we can get the response size (not required)
    dynamicMeta: (req, res) => {
        const httpRequest = {};
        const meta = {};
        if (req) {
            meta.httpRequest = httpRequest;
            httpRequest.requestMethod = req.method;
            httpRequest.requestUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
            httpRequest.protocol = `HTTP/${req.httpVersion}`;
            // httpRequest.remoteIp = req.ip // this includes both ipv6 and ipv4 addresses separated by ':'
            httpRequest.remoteIp = req.ip.indexOf(':') >= 0 ? req.ip.substring(req.ip.lastIndexOf(':') + 1) : req.ip; // just ipv4
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

const logger = createLogger(options);

const loggerHttp = expressWinston.logger(optionsHttp);



module.exports = {
    logger,
    loggerHttp,
};
