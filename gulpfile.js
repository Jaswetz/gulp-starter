var gulp = require('gulp'),
    sass = require('gulp-sass'),
    plumber = require('gulp-plumber'),
    sourcemaps = require('gulp-sourcemaps'),
    notify = require('gulp-notify'),
    gutil = require('gulp-util'),
    browserSync = require('browser-sync'),
    svgstore = require('gulp-svgstore'),
    svgmin = require('gulp-svgmin'),
    inject = require('gulp-inject'),
    rename = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    del = require('del');

    // files
    var tempFolderAssets = 'temp/assets';

    // Sass Error Reporting
    //https://github.com/mikaelbr/gulp-notify/issues/81
    var reportError = function (error) {
        var lineNumber = (error.lineNumber) ? 'LINE ' + error.lineNumber + ' -- ' : '';

        notify({
            title: 'Task Failed [' + error.plugin + ']',
            message: lineNumber + 'See console.',
            sound: 'Sosumi' // See: https://github.com/mikaelbr/node-notifier#all-notification-options-with-their-defaults
        }).write(error);

        gutil.beep(); // Beep 'sosumi' again

        // Inspect the error object
        //console.log(error);

        // Easy error reporting
        //console.log(error.toString());

        // Pretty error reporting
        var report = '';
        var chalk = gutil.colors.white.bgRed;

        report += chalk('TASK:') + ' [' + error.plugin + ']\n';
        report += chalk('PROB:') + ' ' + error.message + '\n';
        if (error.lineNumber) { report += chalk('LINE:') + ' ' + error.lineNumber + '\n'; }
        if (error.fileName)   { report += chalk('FILE:') + ' ' + error.fileName + '\n'; }
        console.error(report);

        // Prevent the 'watch' task from stopping
        this.emit('end');
    }

// Browser definitions for autoprefixer
var AUTOPREFIXER_BROWSERS = [
  'last 3 versions'
];

// Static Server + watching scss/html files
gulp.task('serve', ['clean', 'compile-css', 'compile-html', 'compile-javascript', 'move-images',], function() {

    browserSync.init({
        server: "./temp"
    });

    gulp.watch("src/scss/**/*.scss", ['compile-css']);
    gulp.watch("src/**/*.html", ['compile-html']);
    gulp.watch("src/svg/**/*.svg", ['compile-html']);
    gulp.watch("src/js/**/*.js", ['compile-javascript']);
    gulp.watch("src/img/**/*", ['move-images']);
});

// Compile Sass
gulp.task('compile-css', function() {
    return gulp.src('src/scss/main.scss')
        .pipe(plumber({
            errorHandler: reportError
        }))
        .pipe(sourcemaps.init())
        .pipe(sass({
            style: 'expanded',
        }))
        .pipe(autoprefixer(AUTOPREFIXER_BROWSERS))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(tempFolderAssets + '/css'))
        .pipe(browserSync.stream())
        .on('error', reportError);
});

// Move HTML
gulp.task('compile-html', function() {

    var svgs = gulp.src('src/svg/*.svg')
        .pipe(rename({prefix: 'icn-'}))
        .pipe(svgstore({ inlineSvg: true }));

    function fileContents (filePath, file) {
        return file.contents.toString();
    }

    gulp.src('src/*.html')
      .pipe(inject(svgs, { transform: fileContents }))
      .pipe(gulp.dest('temp'))
      .pipe(browserSync.stream());
});

// Compile Development JavaScript
gulp.task('compile-javascript', function() {
    gulp.src(['src/js/main.js'])
        .pipe(concat('main.js'))
        .pipe(gulp.dest(tempFolderAssets +'/js'))
        .pipe(browserSync.stream());
});

// Compress Images
gulp.task('move-images', function() {
  return gulp.src('src/img/**/*')
    .pipe(gulp.dest(tempFolderAssets + '/img'))
    .pipe(browserSync.stream());
});

// Clean up
gulp.task('clean', function () {
  return del.sync([
    './temp/**'
  ]);
});

// Default task
gulp.task('default', ['serve']);
