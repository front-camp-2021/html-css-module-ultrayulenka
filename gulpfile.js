const { src, dest, series, watch, parallel } = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');

const srcPath = './src/module-3/online-store/';

function styles(cb) {
  src(`${srcPath}styles/style.scss`)
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 2 version'],
      cascade: false
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(dest(srcPath));

  cb();
}

function watching(cb) {
  watch(`${srcPath}styles/**/*.scss`, styles);

  cb();
}

exports.build = series(styles);
exports.default = series(
  styles,
  parallel(watching)
);
