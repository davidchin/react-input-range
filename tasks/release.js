import gulp from 'gulp';
import gutil from 'gulp-util';
import bump from 'gulp-bump';
import prompt from 'gulp-prompt';
import semver from 'semver';
import runSequence from 'run-sequence';
import config from './config';

let newVersion;

gulp.task('release', (callback) => {
  runSequence('releasePrompt', 'releaseBump', 'dist', callback);
});

gulp.task('releasePrompt', () => {
  const promptConfig = {
    type: 'list',
    name: 'releaseType',
    message: 'What\'s the type of this release?',
    choices: [
      {
        value: 'patch',
        name: gutil.colors.yellow('Patch: ' + semver.inc(config.version, 'patch')),
      },
      {
        value: 'minor',
        name: gutil.colors.yellow('Minor: ' + semver.inc(config.version, 'minor')),
      },
      {
        value: 'major',
        name: gutil.colors.yellow('Major: ' + semver.inc(config.version, 'major')),
      },
    ],
  };

  return gulp.src(config.release.src, { read: false })
    .pipe(prompt.prompt(promptConfig, (response) => {
      newVersion = semver.inc(config.version, response.releaseType);
    }));
});

gulp.task('releaseBump', () => {
  return gulp.src(config.release.src)
    .pipe(bump({ version: newVersion }))
    .pipe(gulp.dest('./'));
});
