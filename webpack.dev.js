const { merge } = require('webpack-merge');
const prod = require('./webpack.config.js');

module.exports = merge(prod, {
  mode: 'development'
});