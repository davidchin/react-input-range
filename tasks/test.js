import gulp from 'gulp';
import config from './config';
import { Server } from 'karma';

gulp.task('test', [
  'test:script',
]);

gulp.task('test:script', ['test:unit']);

gulp.task('test:unit', (done) => {
  const server = new Server(config.test.unit, done);

  server.start();
});
