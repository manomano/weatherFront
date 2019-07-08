var gulp = require("gulp");
var useref = require('gulp-useref');
var gulpIf = require('gulp-if');
var uglify = require("gulp-uglify-es").default;
var cssnano = require('gulp-cssnano');
var del = require("del");
var html_min = require("gulp-htmlmin");
var imagemin = require('gulp-imagemin');

gulp.task('minify', function () {
    return gulp.src('*.html')
        .pipe(useref())
        .pipe(gulpIf('*.css', cssnano()))
        .pipe(gulpIf('*.js', uglify({
            mangle: false
        })))
        .pipe(gulp.dest('dist'))
});

gulp.task('icons', function () {
    return gulp.src('assets/icon/*')
        .pipe(gulp.dest('dist/assets/icon'))
})

gulp.task('fonts', function () {
    return gulp.src('assets/fonts/*')
        .pipe(gulp.dest('dist/assets/fonts'))
})

gulp.task('images', function () {
    return gulp.src('assets/images/**/*.+(png|jpg|gif|svg)')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/assets/images'))
});

gulp.task("clean", function () {
    var paths = [
        "dist/app",
        "dist/assets",
        "dist/*.js",
        "dist/*.html"
    ];
    return del(paths);
});

gulp.task("pre_build", ["minify", "icons", "fonts", "images"], function () {

    var options = {
        base: "./"
    };
    var sources = [
        "app/*.html",
        "app/**/*.html",
        "app/**/**/*.html",
        "app/**/**/**/**/*.html",
        "app/**/**/**/**/**/*.html",
        "app/**/**/**/**/**/**/*.html"
    ];

    return gulp
        .src(sources, options)
        .pipe(html_min({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest("dist"));
});

gulp.task("build", ["clean"], function () {
    gulp.start("pre_build");
});



gulp.task('webserver', ['watch','build'], function() {
    gulp.src('.')
        .pipe(webserver({
            livereload: false,
            directoryListing: true,
            open: "http://localhost:8000/dist/index.html"
        }));
});


//gulp.task('default', ['serve']);
