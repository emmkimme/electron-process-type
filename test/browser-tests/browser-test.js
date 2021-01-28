const eptModule = require('../../lib');
const GetExecutionContextTest = require('../generic-test').GetExecutionContextTest;

GetExecutionContextTest('GetExecutionContext in renderer process', eptModule.BrowserRuntime | eptModule.BrowserEnv);

if (window.Worker) {
    const myWorker = new Worker("./browser-worker.bundle.js");
    myWorker;
}