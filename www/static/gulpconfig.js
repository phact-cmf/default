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
            'js/js_validation.js',
            'js/utils.js',
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
        fancybox: {
            js: [
                'bower_components/fancybox/source/jquery.fancybox.pack.js',
                'bower_components/fancybox/source/jquery.fancybox-buttons.js',
                'bower_components/fancybox/source/jquery.fancybox-media.js',
                'bower_components/fancybox/source/jquery.fancybox-thumbs.js'
            ]
        },
        slick: {
            js: [
                'bower_components/slick-carousel/slick/slick.min.js'
            ]
        },
        underscore: {
            js: [
                'bower_components/underscore/underscore.js'
            ]
        },
        modal: {
            js: [
                'components/modal/modal.js'
            ]
        },
        smart_tabs: {
            js: [
                'components/smart-tabs/smart-tabs.js'
            ]
        },
        sticky: {
            js: [
                'components/sticky/sticky.js'
            ]
        },
        jquery: {
            js: [
                'bower_components/jquery/dist/jquery.min.js'
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