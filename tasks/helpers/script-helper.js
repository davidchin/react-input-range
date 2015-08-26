import gulp from 'gulp';
import gutil from 'gulp-util';
import browserify from 'browserify';
import babelify from 'babelify';
import watchify from 'watchify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import _ from 'lodash';

function bundleScript(bundler, output, dest) {
  function onError(error) {
    gutil.log(gutil.colors.red('Browserify Error' + error));
  }

  return bundler.bundle()
    .on('error', onError)
    .pipe(source(output))
    .pipe(buffer())
    .pipe(gulp.dest(dest));
}

function compileScript(watch, opts) {
  const acceptedOpts = _.pick(opts, 'paths', 'entries', 'noParse', 'debug', 'standalone');
  const browserifyOpts = _.defaults({}, acceptedOpts, watchify.args);
  const babelifyOpts = { comments: false };

  let bundler = browserify(browserifyOpts).transform(babelify.configure(babelifyOpts));

  if (opts.external) {
    bundler.external(opts.external);
  }

  if (watch) {
    bundler = watchify(bundler);

    gutil.log('Watching ' + gutil.colors.yellow(opts.entries));

    bundler.on('update', () => {
      gutil.log('Bundling ' + gutil.colors.green(opts.output));

      bundleScript(bundler, opts.output, opts.dest);
    });
  }

  return bundleScript(bundler, opts.output, opts.dest);
}

const scriptHelper = {
  bundleScript,
  compileScript,
};

export default scriptHelper;
