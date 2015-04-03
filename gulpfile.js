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
    browserSync = require('browser-sync'),
    minifyHTML = require('gulp-minify-html'),
    styleguide = require('sc5-styleguide'),
    del = require('del'),
    reload = browserSync.reload;

gulp.task('html-watch', ['html'], browserSync.reload);

// Static Server + watching scss/html files
gulp.task('serve', ['sass', 'html'], function() {

    browserSync({
        server: "dist"
    });

    gulp.watch("app/scss/*.scss", ['sass']);
    gulp.watch("app/*.html"), ['html-watch'];
});


// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("app/scss/*.scss")
        .pipe(sass())
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest("dist/assets/css"))
        .pipe(reload({stream: true}));
});

// Minify HTML
gulp.task('html', function() {
  gulp.src('app/**/*.html')
    .pipe(gulp.dest('dist'))
    .pipe(reload({stream: true}));
});

gulp.task('default', ['serve']);


// var gulp = require('gulp'),
//     sass = require('gulp-sass'),
//     autoprefixer = require('gulp-autoprefixer'),
//     minifycss = require('gulp-minify-css'),
//     jshint = require('gulp-jshint'),
//     uglify = require('gulp-uglify'),
//     imagemin = require('gulp-imagemin'),
//     rename = require('gulp-rename'),
//     concat = require('gulp-concat'),
//     notify = require('gulp-notify'),
//     cache = require('gulp-cache'),
//     browserSync = require('browser-sync'),
//     minifyHTML = require('gulp-minify-html'),
//     styleguide = require('sc5-styleguide'),
//     reload = browserSync.reload;

// // Static server
// gulp.task('serve', ['styles'],function() {

//     browserSync({
//         server: {
//             baseDir: "builds"
//         }
//     });

//     // Watch .scss files
//     gulp.watch('src/styles/**/*.scss', ['styles'], reload);

//     //Watch HTML
//     gulp.watch('builds/**/*.html').on('change', reload);
// });

// // Compile Sass
// gulp.task('styles', function() {
//     return gulp.src('src/styles/main.scss')
//         .pipe(sass({ style: 'expanded' }))
//         .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
//         .pipe(gulp.dest('builds/assets/css'))
//         .pipe(rename({ suffix: '.min'}))
//         .pipe(minifycss())
//         .pipe(gulp.dest('builds/assets/css'))
//         .pipe(notify({ message: 'Styles task complete' }))
//         .pipe(reload({stream: true}));
// });

// // Compile JavaScript
// gulp.task('scripts', function() {
//     return gulp.src('builds/scripts/**/*.js')
//         .pipe(jshint('.jshintrc'))
//         .pipe(jshint.reporter('default'))
//         .pipe(concat('main.js'))
//         .pipe(gulp.dest('builds/assets/js'))
//         .pipe(rename({suffix: '.min'}))
//         .pipe(uglify())
//         .pipe(gulp.dest('builds/assets/js'))
//         .pipe(notify({ message: 'Scripts task complete' }))
// });

// // Minify HTML
// gulp.task('html', function() {
//   gulp.src('src/**/*.html')
//     .pipe(minifyHTML())
//     .pipe(gulp.dest('builds'))
// });

// // Compress Images
// gulp.task('images', function() {
//   return gulp.src('src/img/**/*')
//     .pipe(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true }))
//     .pipe(gulp.dest('builds/assets/img'))
//     .pipe(notify({ message: 'Images task complete' }))
// });

// // Clean up!
// gulp.task('clean', function(cb) {
//     del(['builds/assets/css', 'builds/assets/js', 'builds/assets/img', 'builds/*.html'], cb)
// });

// // Gulp Watch
// gulp.task('watch', function() {

//   // Watch .scss files
//   gulp.watch('src/styles/**/*.scss', ['styles']);

//   // Watch .js files
//   gulp.watch('src/scripts/**/*.js', ['scripts']);

//   // Watch image files
//   gulp.watch('src/images/**/*', ['images']);

//   //Watch HTML
//   gulp.watch('builds/**/*.html', ['html']);

// });


