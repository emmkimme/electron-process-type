const eptModule = require('../');
const GetExecutionContextTest = require('./generic-test').GetExecutionContextTest;

GetExecutionContextTest('GetExecutionContext in Electron node process', eptModule.ElectronRuntime | eptModule.NodeEnv);
