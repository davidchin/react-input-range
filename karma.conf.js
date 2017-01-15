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
      module: {
        loaders: [
          {
            exclude: /node_modules/,
            loader: 'babel',
            query: {
              plugins: ['istanbul'],
            },
            test: /\.js$/,
          },
        ],
      },
    },
  });
}

module.exports = configureKarma;
