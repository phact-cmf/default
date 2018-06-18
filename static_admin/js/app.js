require('../scss/app.scss');

require('../fonts/GothamPro/css/GothamPro.css');
require('../fonts/icons/css/style.css');

require('./flash.js');
require('./form.js');
require('./list.js');
require('./prevention.js');

require('jquery-form/dist/jquery.form.min.js');

window.Flow = require('@flowjs/flow.js/dist/flow.js');

window._ = require('underscore');

require('../components/deparam/jquery.deparam.js');
require('../components/modal/modal.js');
require('../components/confirm/jquery.confirm.js');
require('../components/forms/validation.js');
require('../components/ui-custom/jquery-ui.min.js');
require('../components/ui-custom/jquery-ui.min.css');

/* Files module */
require('phact_modules/Files/static/filesfield/filesfield');
/* Editor module */
require('phact_modules/Editor/static/fileman/fileman');