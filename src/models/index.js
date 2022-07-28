const fs = require('fs');
const path = require('path');

const models = {};

fs.readdirSync(__dirname)
  .filter(file => file !== path.basename(__filename))
  .forEach((file) => {
    // eslint-disable-next-line global-require,import/no-dynamic-require
    const model = require(path.join(__dirname, file));
    models[model.modelName] = model;
  });

module.exports = models;
