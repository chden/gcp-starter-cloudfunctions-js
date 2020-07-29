/* eslint-disable no-unused-vars */

'use strict';

/**
 * logHttp
 * @param {*} logName
 * @param {*} requestMethod
 */
async function logHttpRequest(
    logName = 'my-log', // The name of the log to write to
    requestMethod = 'GET', // GET, POST, PUT, etc.
) {
    const {Logging} = require('@google-cloud/logging');
    const logging = new Logging();
    const log = logging.log(logName);

    const data = `HTTP GET / ${JSON.stringify(process.env)}`;

    const name = process.env.FUNCTION_NAME;
    const cred = process.env.GOOGLE_APPLICATION_CREDENTIALS;
    const id = process.env.GFUNCTION_IDENTITY;
    const project = process.env.GCP_PROJECT;

    const metadata = {
        resource: {type: 'global'},
        httpRequest: {
            requestMethod,
            'requestUrl': 'test',
        },
    };

    const entry = log.entry(metadata, data);

    /**
     * writeLog
     */
    async function writeLog() {
        if (process.env.NODE_ENV === 'production') {
            await log.write(entry);
        } else {
            console.log(`httpRequest: ${data}`);
        }
    }
    writeLog();
}

module.exports.httpRequest = logHttpRequest;
