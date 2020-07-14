const path = require('path');
const GeneratePackageJsonPlugin = require('generate-package-json-webpack-plugin')
const nodeExternals = require("webpack-node-externals");

const basePackageValues = {
  "name": "gcp-starter-cloud-function",
  "version": "1.0.0",
  "private": true,
  "main": "./bundle.js",
  "license": "MIT"
}

const versionsPackageFilename = __dirname + "/package.json";

module.exports = {
  entry: './src/',
  mode: 'production',
  context: __dirname,
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '',
    filename: 'bundle.js',
    libraryTarget: 'commonjs'
  },
  plugins: [
    new GeneratePackageJsonPlugin(basePackageValues, versionsPackageFilename)
  ],
  externals: [nodeExternals({
    allowlist: [/^include-this-dependency/, 'or-this']
  })],
}