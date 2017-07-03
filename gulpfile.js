const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');

const lib = require('bower-files')({
  'overrides': {
    'bootstrap': {
      'main': [
        'less/bootstrap.less',
        'dist/css/bootstrap.css',
        'dist/js/bootstrap.js'
      ]
    }
  }
});

const utilities = require('gulp-util');
let buildProduction = utilities.env.production;
const del = require('del');
const browserSync = require('browser-sync').create();
const shell = require('gulp-shell');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');


/////////////  TYPESCRIPT TASKS  /////////////

gulp.task('tsClean', () => del(['app/*.js', 'app/*.js.map']));

gulp.task('ts', ['tsClean'], shell.task(['tsc']));


////////////  BOWER TASKS  //////////////////

gulp.task('jsBowerClean', () => del(['./build/js/vendor.min.js']));

gulp.task('jsBower', ['jsBowerClean'], () => {
  return gulp.src(lib.ext('js').files)
    .pipe(concat('vendor.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./build/js'));
});

gulp.task('cssBowerClean', () => del(['./build/css/vendor.css']));

gulp.task('cssBower', ['cssBowerClean'], () => {
  return gulp.src(lib.ext('css').files)
  .pipe(concat('vendor.css'))
  .pipe(gulp.dest('./build/css'));
});

gulp.task('bower', ['jsBower', 'cssBower']);


/////////   SASS TASKS   ////////////////

gulp.task('sassBuild', () => {
  return gulp.src(['resources/styles/*'])
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./build/css'));
});


////////   SERVER    ////////////

gulp.task('serve', ['build'], () => {
  browserSync.init({
    server: {
      baseDir: './',
      index: 'index.html'
    }
  });
  gulp.watch(['resource/js/*.js'], ['jsBuild']);
  gulp.watch(['*.html'], ['htmlBuild']);
  gulp.watch(['resources/styles/*.css', 'resources/styles/*.scss'], ['cssBuild']);
  gulp.watch(['app/*.ts'], ['tsBuild']);
});

gulp.task('jsBuild', () => browserSync.reload());
gulp.task('htmlBuild', () => browserSync.reload());
gulp.task('cssBuild', ['sassBuild'], () => browserSync.reload());
gulp.task('tsBuild', ['ts'], () => browserSync.reload());


////  GLOBAL BUILD  //////

gulp.task('build', ['ts'], () => {
  gulp.start('bower');
  gulp.start('sassBuild');
});
