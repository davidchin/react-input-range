import gulp from 'gulp';
import sass from 'gulp-sass';
import minifyCss from 'gulp-minify-css';
import rename from 'gulp-rename';
import concat from 'gulp-concat';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer-core';
import config from './config';

const postcssPlugins = [
  autoprefixer({
    browsers: ['last 2 versions'],
  }),
];

gulp.task('style', [
  'style:build',
  'style:example',
]);

gulp.task('style:build', ['lint:style', 'clean:style'], () => {
  return gulp.src(config.style.build.src)
    .pipe(sass(config.style.build.sass))
    .pipe(postcss(postcssPlugins))
    .pipe(concat(config.style.build.output))
    .pipe(gulp.dest(config.style.build.dest));
});

gulp.task('style:dist', ['style:build', 'clean:style:dist'], () => {
  return gulp.src(config.style.dist.src)
    .pipe(gulp.dest(config.style.dist.dest))
    .pipe(minifyCss())
    .pipe(rename(config.style.dist.rename))
    .pipe(gulp.dest(config.style.dist.dest));
});

gulp.task('style:example', ['clean:style:example', 'style:build'], () => {
  return gulp.src(config.style.example.src)
    .pipe(sass(config.style.example.sass))
    .pipe(postcss(postcssPlugins))
    .pipe(concat(config.style.example.output))
    .pipe(gulp.dest(config.style.example.dest));
});
