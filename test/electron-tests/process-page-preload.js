let processType
try {
    processType = process.type
}
catch (err) {
    processType= err
}

const electronProcessTypeModule = require('../../lib/v2');
let electronProcessType=electronProcessTypeModule.GetElectronProcessType()

console.log(`process.type=${processType}`);
console.log(`GetElectronProcessType(v2)=${electronProcessType}`);
