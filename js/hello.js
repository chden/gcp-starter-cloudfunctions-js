'use strict';

const {logger} = require('./logger');


exports.hello = (req, res) => {
    logger.info('Log this message!');
    res.send('Hello, World!');
};

exports.helloUser = (req, res) => {
    const username = req.params.username;
    res.send(`Hello, ${username}!`);
};
