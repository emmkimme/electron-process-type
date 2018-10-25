const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;

const electronProcessTypeModule = require('../lib');

describe('GetElectronProcessType V1', function () {

    it(`call in node process`, function () {
      assert(electronProcessTypeModule.GetElectronProcessType() == 'node');

    });
});


