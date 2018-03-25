var fs = require('fs');

var modulesDir = '../../app/Modules';

var modules = fs.readdirSync(modulesDir).map(function (module) {
    return modulesDir + '/' + module;
});

module.exports.name = "main";

module.exports.compress = false;

module.exports.hash = true;

module.exports.frontend = {
    dst: {
        js: 'frontend/dist/js',
        scss: 'frontend/css',
        css: 'frontend/dist/css',
        images: 'frontend/dist/images',
        fonts: 'frontend/dist/fonts',
        raw: 'frontend/dist/raw',
        svg: 'frontend/dist/svg',
        svg_style: 'frontend/scss/_parts',
        temp_svg: 'frontend/temp/svg'
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
            'frontend/css/*',
            'fonts/GothamPro/css/GothamPro.css'
        ],
        images: [
            'frontend/images/**/*.*'
        ],
        fonts: [
            'fonts/GothamPro/fonts/**/*'
        ],
        svg: [
            'frontend/svg/*.svg'
        ],
        raw: [

        ]
    },
    templates: {
        svg_sprite: 'frontend/templates/_svg_sprite._css'
    },
    vendors: {
        jquery: {
            js: [
                'node_modules/jquery/dist/jquery.min.js'
            ]
        },
        underscore: {
            js: [
                'node_modules/underscore/underscore.js'
            ]
        },
        fancybox: {
            js: [
                'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.js'
            ],
            css: [
                'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.css'
            ]
        },
        slick: {
            js: [
                'node_modules/slick-carousel/slick/slick.min.js'
            ],
            css: [
                'node_modules/slick-carousel/slick/slick.css'
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
        forms: {
            js: [
                'components/forms/validation.js'
            ]
        },
        masked: {
            js: [
                'components/masked/jquery.maskedinput.js'
            ]
        }
    }
};

module.exports.backend = {
    dst: {
        js: 'backend/dist/js',
        scss: 'backend/temp/css',
        css: 'backend/dist/css',
        images: 'backend/dist/images',
        fonts: 'backend/dist/fonts',
        raw: 'backend/dist/raw'
    },
    src: {
        js: [
            'backend/js/*.js'
        ].concat(modules.map(function(dir) {
            return dir + '/static/backend/js/**/*.*'
        })),
        scss: [
            'backend/scss/**/*.scss'
        ].concat(modules.map(function(dir) {
            return dir + '/static/backend/scss/**/*.*'
        })),
        css: [
            'backend/temp/css/*',
            'fonts/GothamPro/css/GothamPro.css',
            'backend/fonts/icons/css/style.css'
        ].concat(modules.map(function(dir) {
            return dir + '/static/backend/css/**/*.*'
        })),
        images: [
            'backend/images/**/*.*'
        ],
        fonts: [
            'fonts/GothamPro/fonts/**/*',
            'backend/fonts/icons/fonts/*'
        ],
        raw: [

        ].concat(modules.map(function(dir) {
            return dir + '/static/backend/raw/*/**'
        }))
    },
    vendors: {
        jquery: {
            js: [
                'node_modules/jquery/dist/jquery.min.js'
            ]
        },
        jquery_form: {
            js: [
                'node_modules/jquery-form/dist/jquery.form.min.js'
            ]
        },
        modal: {
            js: [
                'components/modal/modal.js'
            ]
        },
        underscore: {
            js: [
                'node_modules/underscore/underscore.js'
            ]
        },
        confirm: {
            js: [
                'components/confirm/jquery.confirm.js'
            ]
        },
        cds: {
            scss_include: [
                'components/cds'
            ]
        },
        deparam: {
            js: [
                'components/deparam/jquery.deparam.js'
            ]
        },
        ui_custom: {
            js: [
                'components/ui-custom/jquery-ui.min.js'
            ],
            css: [
                'components/ui-custom/jquery-ui.min.css'
            ]
        },
        flow: {
            js: [
                'node_modules/@flowjs/flow.js/dist/flow.js'
            ]
        },
        files_field: {
            js: [
                'components/fields/js/filesfield.js'
            ]
        },
        forms: {
            js: [
                'components/forms/validation.js'
            ]
        }
    }
};