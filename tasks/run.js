import gulp from 'gulp';

gulp.task('run', [
  'build',
  'watch',
  'connect',
]);
