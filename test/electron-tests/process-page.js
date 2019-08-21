
window.addEventListener('load', () => {
    let processType
    try {
        processType = process.type
    }
    catch (err) {
        processType = err
    }

    const electronProcessTypeModuleV1 = require('../../lib/v1');
    const electronProcessTypeV1 = electronProcessTypeModuleV1.GetElectronProcessType()
    
    const electronProcessTypeModuleV2= require('../../lib/v2');
    const electronProcessTypeV2 = electronProcessTypeModuleV2.GetElectronProcessType()
    
    const electronProcessTypeModuleV3 = require('../../lib/v3');
    const electronProcessTypeV3 = electronProcessTypeModuleV3.GetElectronProcessType()
    
    const electronProcessTypeModuleV4 = require('../../lib/v4');
    const electronProcessTypeV4 = electronProcessTypeModuleV4.GetElectronProcessType()
    
    document.open();
    document.write(`<h1>Test process!</h1>`);
    document.write(`<br>`);
    document.write(`process.type=${processType}`);
    document.write(`<br>`);
    document.write(`GetElectronProcessType(v1)=${electronProcessTypeV1}`);
    document.write(`<br>`);
    document.write(`GetElectronProcessType(v2)=${electronProcessTypeV2}`);
    document.write(`<br>`);
    document.write(`GetElectronProcessType(v3)=${electronProcessTypeV3}`);
    document.write(`<br>`);
    document.write(`GetElectronProcessType(v4)=${electronProcessTypeV4}`);
    document.write(`<br>`);
    document.close();
})
