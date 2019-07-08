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

gulp.task('copy-html-files', function () {
    var stream =  gulp.src('./App/**/*.html') // stream source
        .pipe(gulp.dest('./dist/app/')); // copy to dist/views
    return stream;
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

gulp.task("pre_build", gulp.parallel("minify", "icons", "fonts", "images","copy-html-files"), function () {

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
        .pipe(gulp.dest("dist/app"));
});




gulp.task("build", gulp.series("clean", "pre_build"), function () {
    return gulp.start("pre_build");

});

gulp.task('watch', function() {
    gulp.watch('path/to/file', ['minify']);

    return gulp.watch(['./index.html','./App/*.html','./App/**/*.html', './App/style.css', './App/**/*.js'], ['build']);
});

gulp.task('webserver', gulp.series('watch','build'), function() {
    gulp.src('.')
        .pipe(webserver({
            livereload: false,
            directoryListing: true,
            open: "http://localhost:8000/dist/index.html"
        }));
});
//
//
// //gulp.task('default', ['serve']);
