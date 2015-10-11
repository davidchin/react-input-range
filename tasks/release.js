import gulp from 'gulp';
import gutil from 'gulp-util';
import bump from 'gulp-bump';
import prompt from 'gulp-prompt';
import git from 'gulp-git';
import semver from 'semver';
import runSequence from 'run-sequence';
import config from './config';

let newVersion = config.version;

gulp.task('release', (callback) => {
  runSequence(
    'releasePrompt',
    'build:dist',
    'releaseBump',
    'releaseCommit',
    'releaseTag',
    callback
  );
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

  return gulp.src('./', { read: false })
    .pipe(prompt.prompt(promptConfig, (response) => {
      newVersion = semver.inc(config.version, response.releaseType);
    }));
});

gulp.task('releaseBump', () => {
  return gulp.src(config.release.src)
    .pipe(bump({ version: newVersion }))
    .pipe(gulp.dest('./'));
});

gulp.task('releaseCommit', () => {
  const message = `Release v${newVersion}`;

  return gulp.src('./')
    .pipe(git.add())
    .pipe(git.commit(message));
});

gulp.task('releaseTag', (callback) => {
  const message = `Release v${newVersion}`;
  const tag = `v${newVersion}`;

  git.tag(tag, message, callback);
});
