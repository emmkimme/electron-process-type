const shelljs = require('shelljs');
const path = require('path');

shelljs.exec(path.join(__dirname, 'browser-tests', 'browser-test.html'));