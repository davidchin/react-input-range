import gulp from 'gulp';

gulp.task('run', [
  'build',
  'connect',
  'watch',
]);
