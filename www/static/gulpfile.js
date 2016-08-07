const gulp = require('gulp');
const concat = require('gulp-concat');
const cssnano = require('gulp-cssnano');
const imagemin = require('gulp-imagemin');
const livereload = require('gulp-livereload');
const rimraf = require('gulp-rimraf');
const sass = require('gulp-sass');
const hashsum = require('gulp-hashsum');
const uglify = require('gulp-uglify');
var config = require('./gulpconfig');

for (var vendor in config.vendors) {
    if (config.vendors.hasOwnProperty(vendor)) {
        var vendorConfig = config.vendors[vendor];
        for (var type in vendorConfig) {
            if (vendorConfig.hasOwnProperty(type)) {
                var matches = vendorConfig[type];
                if (config.paths.src.hasOwnProperty(type)) {
                    if (typeof matches == 'string') {
                        config.paths.src[type].push(matches);
                    } else {
                        config.paths.src[type].push.apply(config.paths.src[type], matches);
                    }
                }
            }
        }
    }
}

gulp.task('scss', function() {
    return gulp.src(config.paths.src.scss)
        .pipe(sass({}).on('error', sass.logError))
        .pipe(gulp.dest(config.paths.dest.scss));
});

gulp.task('css', ['scss'], function() {
    var pipe = gulp.src(config.paths.src.css);
    if (config.compress) {
        pipe = pipe.pipe(cssnano())
    }
    return pipe.pipe(concat(config.name + '.css')).
        pipe(hashsum({filename: 'versions/css.yml', hash: 'md5'})).
        pipe(gulp.dest(config.paths.dest.css)).
        pipe(livereload());
});

gulp.task('js', function() {
    var pipe = gulp.src(config.paths.src.js);
    if (config.compress) {
        pipe = pipe.pipe(uglify())
    }
    return pipe.pipe(concat(config.name + '.js')).
        pipe(hashsum({filename: 'versions/js.yml', hash: 'md5'})).
        pipe(gulp.dest(config.paths.dest.js)).
        pipe(livereload());
});

gulp.task('images', function() {
    var pipe = gulp.src(config.paths.src.images);
    if (config.compress) {
        pipe = pipe.pipe(imagemin())
    }
    return pipe.pipe(gulp.dest(config.paths.dest.images)).pipe(livereload());
});

gulp.task('fonts', function() {
    return gulp.src(config.paths.src.fonts)
        .pipe(gulp.dest(config.paths.dest.fonts)).pipe(livereload());
});

gulp.task('watch', ['build'], function() {
    livereload({ start: true });
    gulp.watch(config.paths.src.scss, ['css']);
    gulp.watch(config.paths.src.images, ['images']);
    gulp.watch(config.paths.src.fonts, ['fonts']);
});


gulp.task('clear', function() {
    return gulp.src('built/*').pipe(rimraf());
});

gulp.task('build', ['clear'], function(){
    gulp.start('css', 'js', 'images', 'fonts');
});

gulp.task('default', function(){
    gulp.start('watch');
});
