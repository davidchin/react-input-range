const { optimize: { DedupePlugin, UglifyJsPlugin } } = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const SasslintPlugin = require('sasslint-webpack-plugin');

const webpackConfig = {
  context: __dirname,
  devtool: 'source-map',
  entry: {
    'react-input-range.css': './src/scss/index.scss',
    'react-input-range.js': './src/js/index.js',
    'react-input-range.min.js': './src/js/index.js',
  },
  output: {
    filename: '[name]',
    path: './lib/bundle',
    library: 'InputRange',
    libraryTarget: 'umd',
  },
  module: {
    loaders: [
      {
        exclude: /node_modules/,
        loader: 'babel',
        test: /\.jsx?$/,
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css!postcss!sass'),
      },
    ],
  },
  plugins: [
    new DedupePlugin(),
    new ExtractTextPlugin('[name]'),
    new UglifyJsPlugin({
      test: /\.min\.js$/,
    }),
  ],
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
};

module.exports = webpackConfig;
