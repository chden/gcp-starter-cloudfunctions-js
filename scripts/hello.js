'use strict';

const {logger} = require('./logger');

exports.hello = (req, res) => {
    logger.info('this is an info log message');
    res.send('Hello, World!');
};

exports.helloUser = (req, res) => {
    const username = req.params.username;
    res.send(`Hello, ${username}!`);
};
