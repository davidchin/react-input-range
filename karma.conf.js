module.exports = function(config) {
  config.set({
    basePath: '',

    frameworks: ['browserify', 'jasmine'],

    files: [
      'node_modules/react/dist/react.js',
      'node_modules/react-dom/dist/react-dom.js',
      'node_modules/lodash/index.js',
      'node_modules/babelify/polyfill.js',
      'src/**/*.js',
      'test/**/*.js'
    ],

    exclude: [
    ],

    preprocessors: {
      'src/**/*.js': ['browserify'],
      'test/**/*.js': ['browserify'],
      'node_modules/babelify/polyfill.js': ['browserify']
    },

    babelPreprocessor: {
      options: {
        modules: 'ignore'
      }
    },

    browserify: {
      debug: true,
      extensions: ['.js', '.jsx'],
      transform: ['babelify'],
      paths: [
        'src'
      ]
    },

    reporters: ['progress'],

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: true,

    browsers: ['PhantomJS2'],

    singleRun: false
  })
}
