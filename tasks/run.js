import gulp from 'gulp';
import runSequence from 'run-sequence';

gulp.task('run', (callback) => {
  runSequence(
    'build',
    ['watch', 'connect'],
    callback
  );
});
