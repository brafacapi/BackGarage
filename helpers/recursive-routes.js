/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
const path = require('path');
const fs = require('fs');

function parseRoute(dir) {
  const REAL_PATH = path.join(__dirname, '../..');
  const names = dir.split(REAL_PATH).join('').split('/');
  names.pop();
  return names.join('/');
}

module.exports = function recursiveRoutes(folderName, app) {
  const REAL_PATH = path.join(__dirname, '../..');
  const basePath = !folderName.includes(REAL_PATH)
    ? path.join(__dirname, '../../', folderName)
    : folderName;

  fs.readdirSync(basePath).forEach((file) => {
    const fullName = path.join(basePath, file);
    const stat = fs.lstatSync(fullName);
    if (stat.isDirectory()) {
      recursiveRoutes(fullName, app);
    } else if (file === 'routes.js') {
      const route = parseRoute(fullName);
      app.use(route, require(fullName));
    }
  });
};
