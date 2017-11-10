const gulp = require('gulp');
const concat = require('gulp-concat');
const cssnano = require('gulp-cssnano');
const imagemin = require('gulp-imagemin');
const livereload = require('gulp-livereload');
const rimraf = require('gulp-rimraf');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');
const hash = require('gulp-hash-filename');
const sprite = require('gulp-svg-sprite');
const svgmin = require('gulp-svgmin');
const cheerio = require('gulp-cheerio');

var config = require('./gulpconfig');
var frontend = config.frontend;
var backend = config.backend;

function buildVendorsData(vendors) {
    var vendorsData = {};
    for (var vendor in vendors) {
        if (vendors.hasOwnProperty(vendor)) {
            var vendorConfig = vendors[vendor];
            for (var type in vendorConfig) {
                if (vendorConfig.hasOwnProperty(type)) {
                    var matches = vendorConfig[type];
                    if (typeof vendorsData[type] == 'undefined') {
                        vendorsData[type] = [];
                    }
                    if (typeof matches == 'string') {
                        vendorsData[type].unshift(matches);
                    } else {
                        vendorsData[type] = [].concat(vendorsData[type], matches)
                    }
                }
            }
        }
    }
    return vendorsData;
}

var frontendVendorsData = buildVendorsData(frontend.vendors);
for (var vendorType in frontendVendorsData) {
    if (frontendVendorsData.hasOwnProperty(vendorType)) {
        if (!frontend.src.hasOwnProperty(vendorType)) {
            frontend.src[vendorType] = [];
        }
        frontend.src[vendorType] = [].concat(frontendVendorsData[vendorType], frontend.src[vendorType]);
    }
}

var backendVendorsData = buildVendorsData(backend.vendors);
for (var vendorType in backendVendorsData) {
    if (backendVendorsData.hasOwnProperty(vendorType)) {
        if (!backend.src.hasOwnProperty(vendorType)) {
            backend.src[vendorType] = [];
        }
        backend.src[vendorType] = [].concat(backendVendorsData[vendorType], backend.src[vendorType]);
    }
}

gulp.task('svg_sprite', ['clear_svg'], function () {
    return gulp.src(frontend.src.svg)
        .pipe(cheerio({
            run: function ($) {
                $('title').remove();
            },
            parserOptions: {xmlMode: true}
        }))
        .pipe(sprite({
            mode: {
                symbol: {
                    dest: './',
                    sprite: 'sprite',
                    render: {
                        css: {
                            dest: 'svg_sprite.css',
                            template: frontend.templates.svg_sprite
                        }
                    }
                }
            }
        }))
        .pipe(gulp.dest(frontend.dst.temp_svg));
});

gulp.task('svg', ['svg_sprite'], function () {
    var svgs = frontend.src.svg;
    svgs.push(frontend.dst.temp_svg + '/sprite.svg');
    return gulp.src(svgs)
        .pipe(gulp.dest(frontend.dst.svg));
});

gulp.task('frontend_scss', function() {
    return gulp.src(frontend.src.scss)
        .pipe(sass({
            includePaths: frontend.src.scss_include ? frontend.src.scss_include : []
        }).on('error', sass.logError))
        .pipe(gulp.dest(frontend.dst.scss));
});

gulp.task('backend_scss', function() {
    return gulp.src(backend.src.scss)
        .pipe(sass({
            includePaths: backend.src.scss_include ? backend.src.scss_include : []
        }).on('error', sass.logError))
        .pipe(gulp.dest(backend.dst.scss));
});

gulp.task('frontend_css', ['frontend_scss', 'clear_frontend_css'], function() {
    var css = frontend.src.css;
    css.push(frontend.dst.temp_svg + "/svg_sprite.css");
    var pipe = gulp.src(frontend.src.css);
    if (config.compress) {
        pipe = pipe.pipe(cssnano())
    }
    pipe = pipe.pipe(concat(config.name + '.css'));
    if (config.hash) {
        pipe = pipe.pipe(hash());
    }
    return pipe.pipe(gulp.dest(frontend.dst.css)).
    pipe(livereload());
});

gulp.task('full_frontend_css', ['svg'], function () {
    gulp.start('frontend_css');
});

gulp.task('backend_css', ['backend_scss', 'clear_backend_css'], function() {
    var pipe = gulp.src(backend.src.css);
    if (config.compress) {
        pipe = pipe.pipe(cssnano())
    }
    pipe = pipe.pipe(concat(config.name + '.css'));
    if (config.hash) {
        pipe = pipe.pipe(hash());
    }
    return pipe.pipe(gulp.dest(backend.dst.css)).
    pipe(livereload());
});

gulp.task('frontend_js', ['clear_frontend_js'], function() {
    var pipe = gulp.src(frontend.src.js);
    if (config.compress) {
        pipe = pipe.pipe(uglify())
    }
    pipe = pipe.pipe(concat(config.name + '.js'));
    if (config.hash) {
        pipe = pipe.pipe(hash());
    }
    return pipe.pipe(gulp.dest(frontend.dst.js)).
    pipe(livereload());
});

gulp.task('backend_js', ['clear_backend_js'], function() {
    var pipe = gulp.src(backend.src.js);
    if (config.compress) {
        pipe = pipe.pipe(uglify())
    }
    pipe = pipe.pipe(concat(config.name + '.js'));
    if (config.hash) {
        pipe = pipe.pipe(hash());
    }
    return pipe.pipe(gulp.dest(backend.dst.js)).
    pipe(livereload());
});

gulp.task('frontend_images', function() {
    var pipe = gulp.src(frontend.src.images);
    if (config.compress) {
        pipe = pipe.pipe(imagemin())
    }
    return pipe.pipe(gulp.dest(frontend.dst.images)).pipe(livereload());
});

gulp.task('backend_images', function() {
    var pipe = gulp.src(backend.src.images);
    if (config.compress) {
        pipe = pipe.pipe(imagemin())
    }
    return pipe.pipe(gulp.dest(backend.dst.images)).pipe(livereload());
});

gulp.task('frontend_fonts', function() {
    return gulp.src(frontend.src.fonts)
        .pipe(gulp.dest(frontend.dst.fonts)).pipe(livereload());
});

gulp.task('backend_fonts', function() {
    return gulp.src(backend.src.fonts)
        .pipe(gulp.dest(backend.dst.fonts)).pipe(livereload());
});

gulp.task('frontend_raw', function() {
    return gulp.src(frontend.src.raw)
        .pipe(gulp.dest(frontend.dst.raw)).pipe(livereload());
});

gulp.task('backend_raw', function() {
    return gulp.src(backend.src.raw)
        .pipe(gulp.dest(backend.dst.raw)).pipe(livereload());
});

gulp.task('watch', ['build'], function() {
    livereload({ start: true });

    gulp.watch(frontend.src.raw, ['frontend_raw']);
    gulp.watch(frontend.src.scss, ['frontend_css']);
    gulp.watch(frontend.src.js, ['frontend_js']);
    gulp.watch(frontend.src.images, ['frontend_images']);
    gulp.watch(frontend.src.fonts, ['frontend_fonts']);
    gulp.watch(frontend.src.svg, ['full_frontend_css']);

    gulp.watch(backend.src.raw, ['backend_raw']);
    gulp.watch(backend.src.scss, ['backend_css']);
    gulp.watch(backend.src.js, ['backend_js']);
    gulp.watch(backend.src.images, ['backend_images']);
    gulp.watch(backend.src.fonts, ['backend_fonts']);
});


gulp.task('clear', function() {
    return gulp.src(['frontend/dist/*', 'backend/dist/*']).pipe(rimraf());
});

gulp.task('clear_frontend_css', function() {
    return gulp.src(['frontend/dist/css/*']).pipe(rimraf());
});

gulp.task('clear_backend_css', function() {
    return gulp.src(['backend/dist/css/*']).pipe(rimraf());
});

gulp.task('clear_frontend_js', function() {
    return gulp.src(['frontend/dist/js/*']).pipe(rimraf());
});

gulp.task('clear_backend_js', function() {
    return gulp.src(['backend/dist/js/*']).pipe(rimraf());
});

gulp.task('clear_svg', function() {
    return gulp.src(['frontend/dist/svg/*', frontend.dst.temp_svg + '/*']).pipe(rimraf());
});

gulp.task('build', ['clear'], function(){
    gulp.start(
        'frontend_raw', 'full_frontend_css', 'frontend_js', 'frontend_images', 'frontend_fonts',
        'backend_raw', 'backend_css', 'backend_js', 'backend_images', 'backend_fonts'
    );
});

gulp.task('default', function(){
    gulp.start('watch');
});
