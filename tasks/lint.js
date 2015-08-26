import gulp from 'gulp';
import eslint from 'gulp-eslint';
import scsslint from 'gulp-scss-lint';
import config from './config';
import _ from 'lodash';

gulp.task('lint', [
  'lint:script',
  'lint:task',
  'lint:style',
]);

gulp.task('lint:script', () => {
  return gulp.src(config.lint.script.src)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});

gulp.task('lint:task', () => {
  return gulp.src(config.lint.task.src)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});

gulp.task('lint:style', () => {
  const options = _.omit(config.lint.style, 'src');

  return gulp.src(config.lint.style.src)
    .pipe(scsslint(options))
    .pipe(scsslint.failReporter());
});
