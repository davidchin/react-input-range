const path = require('path');

function configureKarma(config) {
  config.set({
    basePath: __dirname,
    browsers: ['PhantomJS'],
    coverageReporter: {
        reporters: [
            { type: 'html' },
            { type: 'text' },
        ],
    },
    frameworks: ['jasmine'],
    files: ['test/index.js'],
    preprocessors: {
      'src/index.js': ['coverage'],
      'test/index.js': ['webpack', 'sourcemap'],
    },
    reporters: ['mocha', 'coverage'],
    webpack: {
      devtool: 'inline-source-map',
      externals: {
        'cheerio': 'window',
        'react/addons': true,
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true,
      },
      module: {
        loaders: [
          {
            include: [
              path.resolve(__dirname, 'src'),
              path.resolve(__dirname, 'test'),
            ],
            loader: 'babel',
            query: {
              plugins: ['istanbul'],
            },
            test: /\.jsx?$/,
          },
          {
            include: path.resolve(__dirname, 'src'),
            loaders: ['style', 'css', 'postcss', 'sass'],
            test: /\.scss$/,
          },
        ],
      },
      resolve: {
        extensions: ['', '.js', '.jsx'],
      },
    },
  });
}

module.exports = configureKarma;
