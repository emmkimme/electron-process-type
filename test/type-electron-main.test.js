const genericTest = require('./generic-test').genericTest;

genericTest('GetElectronProcessType in Electron main process', [
  'browser',
  'main',
  'main',
  'main',
  'electron-main-node'
]);
