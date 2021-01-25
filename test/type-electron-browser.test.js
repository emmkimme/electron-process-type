const genericTest = require('./generic-test').genericTest;

genericTest('GetElectronProcessType in Electron renderer process', [
  'renderer',
  'renderer',
  'renderer',
  'browser',
  'electron-browser'
]);
