const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;

const electronProcessTypeModule = require('../lib');

describe('GetElectronProcessType V3', function () {

    it(`call in main process`, function () {
      assert(electronProcessTypeModule.GetElectronProcessType() == 'browser');

    });
});

