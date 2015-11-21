import gulp from 'gulp';
import config from './config';
import { Server } from 'karma';

function startServer(options, done) {
  const server = new Server(options, done);

  server.start();
}

gulp.task('test', [
  'test:script',
]);

gulp.task('test:script', (done) => {
  startServer(config.test.unit, done);
});

gulp.task('test:script:watch', (done) => {
  startServer(config.test.watch, done);
});
