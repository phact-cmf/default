module.exports.name = "main";

module.exports.compress = false;

module.exports.frontend = {
    dest: {
        js: 'frontend/js',
        scss: 'css/frontend',
        css: 'frontend/css',
        images: 'frontend/images',
        fonts: 'frontend/fonts'
    },
    src: {
        js: [
            'js/main.js'
        ],
        scss: [
            'scss/**/*.scss'
        ],
        css: [
            'css/frontend/*'
        ],
        images: [
            'images/**/*.*'
        ],
        fonts: [
            'fonts/**/*.*'
        ]
    },
    vendors: {
        underscore: {
            js: [
                'bower_components/underscore/underscore.js'
            ]
        }
    }
};

module.exports.backend = {
    dest: {
        js: 'backend/js',
        scss: 'css/backend',
        css: 'backend/css',
        images: 'backend/images',
        fonts: 'backend/fonts'
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