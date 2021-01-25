const genericTest = require('../generic-test').genericTest;

genericTest('GetElectronProcessType in renderer process', [
  'renderer',
  'renderer',
  'renderer',
  'browser',
  'browser'
]);

