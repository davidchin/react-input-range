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
        include: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'example'),
        ],
        loader: 'babel',
        test: /\.jsx?$/,
      },
      {
        include: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'example'),
        ],
        loader: ExtractTextPlugin.extract('style', 'css!postcss!sass'),
        test: /\.scss$/,
      },
    ],
    preLoaders: [
      {
        include: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'example'),
        ],
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
