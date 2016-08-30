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
var frontend = config.frontend;

for (var vendor in frontend.vendors) {
    if (frontend.vendors.hasOwnProperty(vendor)) {
        var vendorConfig = frontend.vendors[vendor];
        for (var type in vendorConfig) {
            if (vendorConfig.hasOwnProperty(type)) {
                var matches = vendorConfig[type];
                if (frontend.src.hasOwnProperty(type)) {
                    if (typeof matches == 'string') {
                        frontend.src[type].unshift(matches);
                    } else {
                        frontend.src[type] = matches.concat(frontend.src[type])
                    }
                }
            }
        }
    }
}

gulp.task('frontend_scss', function() {
    return gulp.src(frontend.src.scss)
        .pipe(sass({}).on('error', sass.logError))
        .pipe(gulp.dest(frontend.dest.scss));
});

gulp.task('frontend_css', ['frontend_scss'], function() {
    var pipe = gulp.src(frontend.src.css);
    if (config.compress) {
        pipe = pipe.pipe(cssnano())
    }
    return pipe.pipe(concat(config.name + '.css')).
    pipe(gulp.dest(frontend.dest.css)).
    pipe(hashsum({filename: 'frontend/versions/css.yml', hash: 'md5'})).
    pipe(livereload());
});

gulp.task('frontend_js', function() {
    var pipe = gulp.src(frontend.src.js);
    if (config.compress) {
        pipe = pipe.pipe(uglify())
    }
    return pipe.pipe(concat(config.name + '.js')).
    pipe(gulp.dest(frontend.dest.js)).
    pipe(hashsum({filename: 'frontend/versions/js.yml', hash: 'md5'})).
    pipe(livereload());
});

gulp.task('frontend_images', function() {
    var pipe = gulp.src(frontend.src.images);
    if (config.compress) {
        pipe = pipe.pipe(imagemin())
    }
    return pipe.pipe(gulp.dest(frontend.dest.images)).pipe(livereload());
});

gulp.task('frontend_fonts', function() {
    return gulp.src(frontend.src.fonts)
        .pipe(gulp.dest(frontend.dest.fonts)).pipe(livereload());
});

gulp.task('watch', ['build'], function() {
    livereload({ start: true });
    gulp.watch(frontend.src.scss, ['frontend_css']);
    gulp.watch(frontend.src.js, ['frontend_js']);
    gulp.watch(frontend.src.images, ['frontend_images']);
    gulp.watch(frontend.src.fonts, ['frontend_fonts']);
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
