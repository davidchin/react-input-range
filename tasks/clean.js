import gulp from 'gulp';
import del from 'del';
import config from './config';

gulp.task('clean', [
  'clean:script',
  'clean:style',
  'clean:script:example',
  'clean:style:example',
]);

gulp.task('clean:dist', [
  'clean:script:dist',
  'clean:style:dist',
]);

gulp.task('clean:script', (callback) => {
  del(config.clean.script.src, callback);
});

gulp.task('clean:style', (callback) => {
  del(config.clean.style.src, callback);
});

gulp.task('clean:lib', (callback) => {
  del(config.clean.lib.src, callback);
});

gulp.task('clean:style:example', (callback) => {
  del(config.clean.example.style.src, callback);
});

gulp.task('clean:script:example', (callback) => {
  del(config.clean.example.script.src, callback);
});

gulp.task('clean:style:dist', (callback) => {
  del(config.clean.dist.style.src, callback);
});

gulp.task('clean:script:dist', (callback) => {
  del(config.clean.dist.script.src, callback);
});
