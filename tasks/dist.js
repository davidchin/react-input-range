import gulp from 'gulp';

gulp.task('dist', [
  'clean:dist',
  'build',
  'style:dist',
  'script:dist',
]);
