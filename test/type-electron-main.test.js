const eptModule = require('../');
const GetExecutionContextTest = require('./generic-test').GetExecutionContextTest;

GetExecutionContextTest('GetExecutionContext in Electron main process', eptModule.ElectronRuntime | eptModule.NodeEnv | eptModule.ElectronEnv);
