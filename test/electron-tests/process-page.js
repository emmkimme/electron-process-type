
window.addEventListener('load', () => {
    let processType
    try {
        processType = process.type
    }
    catch (err) {
        processType = err
    }

    const electronProcessTypeModule = require('../../lib/v2');
    let electronProcessType = electronProcessTypeModule.GetElectronProcessType()

    document.open();
    document.write(`<h1>Test process!</h1>`);
    document.write(`<br>`);
    document.write(`process.type=${processType}`);
    document.write(`<br>`);
    document.write(`GetElectronProcessType(v2)=${electronProcessType}`);
    document.write(`<br>`);
    document.close();
})
