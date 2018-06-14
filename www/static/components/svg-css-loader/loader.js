const { getOptions } = require('loader-utils');
const path = require('path');
const _ = require('lodash');
const fs = require('fs');
const requireFromString = require('require-from-string');
const svgson = require('svgson');

module.exports = function loader(content, map) {
    let options = getOptions(this) || {};
    let templateFile = options.template || path.resolve(__dirname, 'template._css');
    let fileName = path.basename(this.resourcePath, '.svg');
    const callback = this.async();

    fs.readFile(templateFile, function (err, data) {
        if (err) {
            throw err;
        }
        svgson(content, {}, result => {
            let template = _.template(data);
            let dims = result.attrs.viewBox.split(/\s/);
            if (dims.length !== 4) {
                dims = [0, 0, 0, 0];
            }
            callback(null, template({
                name: fileName,
                top: dims[0],
                left: dims[1],
                width: dims[2],
                height: dims[3],
            }))
        });
    });

    return;
};