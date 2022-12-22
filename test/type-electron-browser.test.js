const eptModule = require('../');

const GetExecutionContextTest = require('./generic-test').GetExecutionContextTest;

GetExecutionContextTest('GetExecutionContext in Electron renderer process', eptModule.ElectronRuntime | eptModule.BrowserEnv);
