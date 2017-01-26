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
            exclude: /node_modules/,
            loader: 'babel',
            query: {
              plugins: ['istanbul'],
            },
            test: /\.jsx?$/,
          },
          {
            test: /\.scss$/,
            loaders: ['style', 'css', 'postcss', 'sass'],
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
