const { getOptions } = require('loader-utils');
const path = require('path');
const _ = require('lodash');
const fs = require('fs');
const svgson = require('svgson');

module.exports = function loader(content, map) {
  const options = getOptions(this) || {};
  const templateFile = options.template || path.resolve(__dirname, 'template._css');
  const fileName = path.basename(this.resourcePath, '.svg');
  const callback = this.async();

  fs.readFile(templateFile, (err, data) => {
    if (err) {
      throw err;
    }
    svgson(content, {}, (result) => {
      const template = _.template(data);
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
      }));
    });
  });
};
