var
    gulp = require('gulp'),
    useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css');

gulp.task('html', function () {
    var assets = useref.assets();

    gulp.src('./index.html')
        .pipe(assets)
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(assets.restore())
        .pipe(useref())
        .pipe(gulp.dest('__build'));
});

gulp.task('images', function () {
    gulp
        .src('./css/images/*.*')
        .pipe(gulp.dest('__build/css/images'));
});

gulp.task('lib', function () {
    gulp
        .src('./js/lib/*.js')
        .pipe(gulp.dest('__build/js/lib'));
});

gulp.task('default', ['html', 'images', 'lib']);