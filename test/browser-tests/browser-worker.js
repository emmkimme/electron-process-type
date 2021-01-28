importScripts('../../node_modules/mocha/mocha.js');

mocha.setup({
    ui: 'bdd',
    reporter: null,
  });

const eptModule = require('../../lib');
const GetExecutionContextTest = require('../generic-test').GetExecutionContextTest;
GetExecutionContextTest('GetExecutionContext in renderer process', eptModule.BrowserRuntime | eptModule.WorkerEnv);

mocha.run();

// const eptModule = require('../../lib');
// function ConvertEC2String(ec) {
//     let result = [];
//     if (ec & eptModule.NodeEnv) {
//         result.push('NodeEnv');
//     }
//     if (ec & eptModule.BrowserEnv) {
//         result.push('BrowserEnv');
//     }
//     if (ec & eptModule.ElectronEnv) {
//         result.push('ElectronEnv');
//     }
//     if (ec & eptModule.WorkerEnv) {
//         result.push('WorkerEnv');
//     }
//     if (ec & eptModule.BrowserRuntime) {
//         result.push('BrowserRuntime');
//     }
//     if (ec & eptModule.NodeRuntime) {
//         result.push('NodeRuntime');
//     }
//     if (ec & eptModule.ElectronRuntime) {
//         result.push('ElectronRuntime');
//     }
//     return result.join(',');
// }

// const result = eptModule.GetExecutionContext();
// console.info(`Worker = ${ConvertEC2String(result)}`);