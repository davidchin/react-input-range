import gulp from 'gulp';
import babel from 'gulp-babel';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';
import config from './config';
import { compileScript } from './helpers/script-helper';

gulp.task('script', [
  'lint:task',
  'script:build',
  'script:example',
]);

gulp.task('script:build', ['lint:script', 'test:script', 'clean:script'], () => {
  return compileScript(false, config.script.build);
});

gulp.task('script:dist', ['script:build', 'clean:script:dist'], () => {
  return gulp.src(config.script.dist.src)
    .pipe(gulp.dest(config.script.dist.dest))
    .pipe(uglify())
    .pipe(rename(config.script.dist.rename))
    .pipe(gulp.dest(config.script.dist.dest));
});

gulp.task('script:lib', ['lint:script', 'test:script', 'clean:lib'], () => {
  return gulp.src(config.script.lib.src)
    .pipe(babel())
    .pipe(gulp.dest(config.script.lib.dest));
});

gulp.task('script:example', ['clean:script:example', 'script:build'], () => {
  return compileScript(false, config.script.example);
});
