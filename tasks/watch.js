import gulp from 'gulp';
import config from './config';
import { compileScript } from './helpers/script-helper';

gulp.task('watch', [
  'watch:script',
  'watch:style',
  'watch:task',
  'test:script:watch',
]);

gulp.task('watch:script', () => {
  compileScript(true, config.watch.script.example);
  compileScript(true, config.watch.script.build, () => {
    gulp.start('lint:script');
  });
});

gulp.task('watch:style', () => {
  gulp.watch(config.watch.style.src, ['style']);
});

gulp.task('watch:task', () => {
  gulp.watch(config.watch.task.src, ['lint:task']);
});
