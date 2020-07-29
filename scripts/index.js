const express = require('express');
const app = express();
const cors = require('cors');

// eslint-disable-next-line new-cap
const router = express.Router();

app.use(cors());

const {hello, helloUser} = require('./hello');
router.get('/', hello);
router.get('/:username', helloUser);

app.use('/', router);


exports.app = app;
