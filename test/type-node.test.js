const eptModule = require('../');
const GetExecutionContextTest = require('./generic-test').GetExecutionContextTest;

GetExecutionContextTest('GetExecutionContext in node process', eptModule.NodeRuntime | eptModule.NodeEnv);

