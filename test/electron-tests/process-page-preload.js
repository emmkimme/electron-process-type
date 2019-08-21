let processType
try {
    processType = process.type
}
catch (err) {
    processType = err
}

console.log(`process.type=${processType}`);

const electronProcessTypeModuleV1 = require('../../lib/v1');
const electronProcessTypeV1 = electronProcessTypeModuleV1.GetElectronProcessType()

const electronProcessTypeModuleV2= require('../../lib/v2');
const electronProcessTypeV2 = electronProcessTypeModuleV2.GetElectronProcessType()

const electronProcessTypeModuleV3 = require('../../lib/v3');
const electronProcessTypeV3 = electronProcessTypeModuleV3.GetElectronProcessType()

const electronProcessTypeModuleV4 = require('../../lib/v4');
const electronProcessTypeV4 = electronProcessTypeModuleV4.GetElectronProcessType()

console.log(`GetElectronProcessType(v1)=${electronProcessTypeV1}`);
console.log(`GetElectronProcessType(v2)=${electronProcessTypeV2}`);
console.log(`GetElectronProcessType(v3)=${electronProcessTypeV3}`);
console.log(`GetElectronProcessType(v4)=${electronProcessTypeV4}`);
