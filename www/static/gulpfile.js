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

for (var vendor in config.frontend.vendors) {
    if (config.frontend.vendors.hasOwnProperty(vendor)) {
        var vendorConfig = config.frontend.vendors[vendor];
        for (var type in vendorConfig) {
            if (vendorConfig.hasOwnProperty(type)) {
                var matches = vendorConfig[type];
                if (config.frontend.src.hasOwnProperty(type)) {
                    if (typeof matches == 'string') {
                        config.frontend.src[type].push(matches);
                    } else {
                        config.frontend.src[type].push.apply(config.frontend.src[type], matches);
                    }
                }
            }
        }
    }
}

gulp.task('frontend_scss', function() {
    return gulp.src(config.frontend.src.scss)
        .pipe(sass({}).on('error', sass.logError))
        .pipe(gulp.dest(config.frontend.dest.scss));
});

gulp.task('frontend_css', ['frontend_scss'], function() {
    var pipe = gulp.src(config.frontend.src.css);
    if (config.compress) {
        pipe = pipe.pipe(cssnano())
    }
    return pipe.pipe(concat(config.name + '.css')).
        pipe(hashsum({filename: 'frontend/versions/css.yml', hash: 'md5'})).
        pipe(gulp.dest(config.frontend.dest.css)).
        pipe(livereload());
});

gulp.task('frontend_js', function() {
    var pipe = gulp.src(config.frontend.src.js);
    if (config.compress) {
        pipe = pipe.pipe(uglify())
    }
    return pipe.pipe(concat(config.name + '.js')).
        pipe(hashsum({filename: 'frontend/versions/js.yml', hash: 'md5'})).
        pipe(gulp.dest(config.frontend.dest.js)).
        pipe(livereload());
});

gulp.task('frontend_images', function() {
    var pipe = gulp.src(config.frontend.src.images);
    if (config.compress) {
        pipe = pipe.pipe(imagemin())
    }
    return pipe.pipe(gulp.dest(config.frontend.dest.images)).pipe(livereload());
});

gulp.task('frontend_fonts', function() {
    return gulp.src(config.frontend.src.fonts)
        .pipe(gulp.dest(config.frontend.dest.fonts)).pipe(livereload());
});

gulp.task('watch', ['build'], function() {
    livereload({ start: true });
    gulp.watch(config.frontend.src.scss, ['frontend_css']);
    gulp.watch(config.frontend.src.images, ['frontend_images']);
    gulp.watch(config.frontend.src.fonts, ['frontend_fonts']);
});


gulp.task('clear', function() {
    return gulp.src(['frontend/*', 'backend/*']).pipe(rimraf());
});

gulp.task('build', ['clear'], function(){
    gulp.start('frontend_css', 'frontend_js', 'frontend_images', 'frontend_fonts');
});

gulp.task('default', function(){
    gulp.start('watch');
});
