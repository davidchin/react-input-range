import gulp from 'gulp';
import config from './config';
import { compileScript } from './helpers/script-helper';

gulp.task('watch', ['build'], () => {
  gulp.watch(config.watch.style.src, ['style']);
  gulp.watch(config.watch.script.src, ['lint:script', 'test:script']);
  gulp.watch(config.watch.task.src, ['lint:task']);

  compileScript(true, config.watch.script.build);
  compileScript(true, config.watch.script.example);
});
