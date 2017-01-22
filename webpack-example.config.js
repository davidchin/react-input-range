const ExtractTextPlugin = require('extract-text-webpack-plugin');
const SasslintPlugin = require('sasslint-webpack-plugin');
const path = require('path');

const webpackExampleConfig = {
  context: __dirname,
  devtool: 'source-map',
  entry: {
    example: './example/js/index.jsx',
  },
  output: {
    filename: '[name].js',
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
    preLoaders: [
      {
        exclude: /node_modules/,
        loader: 'eslint',
        test: /\.jsx?$/,
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin('[name].css'),
    new SasslintPlugin({
      glob: './src/scss/**/*.scss',
      ignorePlugins: ['extract-text-webpack-plugin'],
    }),
  ],
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
};

module.exports = webpackExampleConfig;
