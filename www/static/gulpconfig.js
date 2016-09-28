module.exports.name = "main";

module.exports.compress = false;

module.exports.frontend = {
    dst: {
        js: 'frontend/dist/js',
        scss: 'frontend/temp/css',
        css: 'frontend/dist/css',
        images: 'frontend/dist/images',
        fonts: 'frontend/dist/fonts'
    },
    src: {
        js: [
            'frontend/js/js_validation.js',
            'frontend/js/utils.js',
            'frontend/js/main.js'
        ],
        scss: [
            'frontend/scss/**/*.scss'
        ],
        css: [
            'frontend/temp/css/*'
        ],
        images: [
            'frontend/images/**/*.*'
        ],
        fonts: [
            'frontend/fonts/**/*.*'
        ]
    },
    vendors: {
        jquery: {
            js: [
                'bower_components/jquery/dist/jquery.min.js'
            ]
        },
        underscore: {
            js: [
                'bower_components/underscore/underscore.js'
            ]
        },
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
        cds: {
            scss_include: [
                'components/cds'
            ]
        },
    }
};

module.exports.backend = {
    dst: {
        js: 'backend/dist/js',
        scss: 'backend/temp/css',
        css: 'backend/dist/css',
        images: 'backend/dist/images',
        fonts: 'backend/dist/fonts'
    },
    src: {
        js: [
            '../../app/Modules/*/static/js/*',
            'backend/js/main.js'
        ],
        scss: [
            '../../app/Modules/*/static/scss/*',
            'backend/scss/**/*.scss'
        ],
        css: [
            '../../app/Modules/*/static/css/*',
            'backend/temp/css/*'
        ],
        images: [
            'backend/images/**/*.*'
        ],
        fonts: [
            'backend/fonts/**/*.*'
        ]
    }
};