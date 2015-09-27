import gulp from 'gulp';

gulp.task('build', [
  'script',
  'style',
]);

gulp.task('build:dist', [
  'script:dist',
  'style:dist',
]);
