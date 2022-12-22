let processType
try {
    processType = process.type
}
catch (err) {
    processType = err
}

console.log(`process.type=${processType}`);

const eptModule = require('../../lib');
const executionContext = eptModule.GetExecutionContext()

const ConvertEC2String = require('../generic-test').ConvertEC2String;
console.log(`GetExecutionContext=${ConvertEC2String(executionContext)}`);

window.PreloadGetExecutionContextResult = executionContext;
