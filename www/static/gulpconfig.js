module.exports.name = "main";

module.exports.compress = false;

module.exports.paths = {
    dest: {
        js: 'built/js',
        scss: 'css',
        css: 'built/css',
        images: 'built/images',
        fonts: 'built/fonts'
    },
    src: {
        js: [
            'js/main.js'
        ],
        scss: [
            'scss/**/*.scss'
        ],
        css: [
            'css/*'
        ],
        images: [
            'images/**/*.*'
        ],
        fonts: [
            'fonts/**/*.*'
        ]
    }
};

module.exports.vendors = {
    underscore: {
        js: [
            'bower_components/underscore/underscore.js'
        ]
    }
};