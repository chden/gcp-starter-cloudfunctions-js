'use strict';

const express = require('express');
const {loggerHttp, loggerError} = require('./utils/logger');
const cors = require('cors');


const app = express();

app.use(loggerHttp);

const router = new express.Router();

app.use(cors());

const {hello, helloUser} = require('./hello/hello');
router.get('/', hello);
router.get('/:username', helloUser);

app.use('/', router);

app.use(loggerError);


exports.app = app;
