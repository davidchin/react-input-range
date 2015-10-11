import gulp from 'gulp';

gulp.task('build', [
  'script',
  'style',
]);

gulp.task('build:dist', [
  'script:dist',
  'style:dist',
]);

gulp.task('build:lib', [
  'script:lib',
]);
