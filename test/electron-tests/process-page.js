
window.addEventListener('load', () => {
    let processType
    try {
        processType = process.type
    }
    catch (err) {
        processType = err
    }

    const eptModule = require('../../lib');
    const executionContext = eptModule.GetExecutionContext()
    console.log(`GetExecutionContext=${executionContext}`);

    const ConvertEC2String = require('../generic-test').ConvertEC2String;
    
    document.open();
    document.write(`<h1>Test process!</h1>`);
    document.write(`<br>`);
    document.write(`GetExecutionContext=${ConvertEC2String(executionContext)}`);
    document.write(`<br>`);
    document.close();
})
