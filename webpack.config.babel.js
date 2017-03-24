import ExtractTextPlugin from 'extract-text-webpack-plugin';
import path from 'path';

const webpackConfig = {
  context: __dirname,
  devtool: 'source-map',
  target: 'web',
  entry: {
    'react-input-range.css': './src/scss/index.scss',
    'react-input-range.js': './src/js/index.js',
    'react-input-range.min.js': './src/js/index.js',
  },
  output: {
    filename: '[name]',
    path: path.resolve(__dirname, 'lib/bundle'),
    library: 'InputRange',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        include: path.resolve(__dirname, 'src'),
        loader: 'babel-loader',
        test: /\.jsx?$/,
      },
      {
        include: path.resolve(__dirname, 'src'),
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader', 'sass-loader'],
        }),
        test: /\.scss$/,
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin('[name]'),
  ],
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.jsx'],
  },
  externals: ['react', 'react-dom'],
};

export default webpackConfig;
