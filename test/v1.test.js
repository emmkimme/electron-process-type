const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;

const electronProcessTypeModule = require('electron-process-type/v1');

describe('GetElectronProcessType V1', function () {

    it(`consolidate Buffers`, function () {
      electronProcessTypeModule.GetElectronProcessType();
    });
});


