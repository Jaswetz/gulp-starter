var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    browsersync = require('browser-sync'),
    minifyHTML = require('gulp-minify-html'),
    styleguide = require('sc5-styleguide'),
    plumber = require('gulp-plumber'),
    del = require('del');

// error function for plumber
var onError = function (err) {
  gutil.beep();
  console.log(err);
  this.emit('end');
};

// Browser definitions for autoprefixer
var AUTOPREFIXER_BROWSERS = [
  'last 3 versions',
  'ie >= 8',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];

// BrowserSync proxy
gulp.task('browser-sync', function() {
  browsersync({
        server: {
            baseDir: "build/development"
        }
  });
});

// BrowserSync reload all Browsers
gulp.task('browsersync-reload', function () {
    browsersync.reload();
});

gulp.task('fileinclude', function() {
    // content
});

// Compile Sass
gulp.task('styles', function() {
    return gulp.src('app/scss/main.scss')
        .pipe(plumber({ errorHandler: onError }))
        .pipe(sass({ style: 'expanded' }))
        .pipe(gulp.dest('build/development/assets/css'))
        .pipe(autoprefixer(AUTOPREFIXER_BROWSERS))
        .pipe(browsersync.reload({ stream:true }))
});

// Compile Sass to Production
gulp.task('buildStyles', function() {
    return gulp.src('app/scss/main.scss')
        .pipe(plumber({ errorHandler: onError }))
        .pipe(sass({ style: 'expanded' }))
        .pipe(gulp.dest('build/production/assets/css'))
        .pipe(autoprefixer(AUTOPREFIXER_BROWSERS))
        .pipe(rename({ suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest('build/production/assets/css'))
        .pipe(notify({ message: 'Styles task complete' }))
});

// Minify HTML
gulp.task('miniHtml', function() {
  gulp.src('app/**/*.html')
    .pipe(minifyHTML())
    .pipe(gulp.dest('build/production/'))
    .pipe(notify({ message: 'HTML Minified' }))
});

// Move HTML
gulp.task('copyHtml', function() {
    gulp.src('app/*.html')
      .pipe(gulp.dest('build/development'))
      .pipe(browsersync.reload({ stream:true }))
});

// Compile JavaScript
gulp.task('buildJs', function() {
    return gulp.src('app/js/**/*.js')
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'))
        .pipe(concat('main.js'))
        .pipe(gulp.dest('build/production/assets/js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('build/production/assets/js'))
        .pipe(notify({ message: 'Scripts task complete' }))
});

// Compile JavaScript
gulp.task('devJs', function() {
    return gulp.src('app/js/**/*.js')
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'))
        .pipe(concat('main.js'))
        .pipe(gulp.dest('build/development/assets/js'))
});

// Compress Images to Build folder
gulp.task('buildImg', function() {
  return gulp.src('app/img/**/*')
    .pipe(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true }))
    .pipe(gulp.dest('build/production/assets/img'))
    .pipe(notify({ message: 'Images task complete' }))
});

// Compress Images to Dev folder
gulp.task('devImg', function() {
  return gulp.src('app/img/**/*')
    .pipe(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true }))
    .pipe(gulp.dest('build/development/assets/img'))
    .pipe(notify({ message: 'Images task complete' }))
});

// Clean up development!
gulp.task('cleanDev', function(cb) {
    del(['build/development/assets', 'build/development/*.html'], cb)
});

// Clean up production!
gulp.task('cleanBuild', function(cb) {
    del(['build/production/assets', 'build/production/*.html'], cb)
});

// Watch task
gulp.task('watch', ['browser-sync'], function () {
    gulp.watch('app/scss/**/*', ['styles']);
    gulp.watch('app/js/**/*', ['browsersync-reload', 'devJs', 'copyHtml']);
    gulp.watch('build/development/**/*', ['browsersync-reload']);
    gulp.watch('app/**/*.html', ['browsersync-reload', 'copyHtml']);
    gulp.watch('app/img/**/*', ['browsersync-reload','devImg', 'copyHtml']);
});


gulp.task('serve',['cleanDev', 'devImg', 'devJs', 'copyHtml', 'styles', 'watch'], function() {});
gulp.task('build',['cleanBuild', 'buildStyles', 'buildImg', 'buildJs', 'miniHtml'], function() {});


