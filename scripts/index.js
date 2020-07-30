'use strict';

const express = require('express');
const cors = require('cors');

const app = express();
// eslint-disable-next-line new-cap
const router = express.Router();

app.use(cors());

const {hello, helloUser} = require('./hello');
router.get('/', hello);
router.get('/:username', helloUser);

app.use('/', router);


exports.app = app;
