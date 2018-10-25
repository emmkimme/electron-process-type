const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;

const electronProcessTypeModule = require('../lib/v2');

describe('GetElectronProcessType V2', function () {

  it(`call in node process - 1`, function () {
    const electronProcessTypeModule = require('../lib');
    assert(electronProcessTypeModule.v2.GetElectronProcessType() == 'node');
  });
  it(`call in node process - 2`, function () {
    const electronProcessTypeModule = require('../lib/v2');
    assert(electronProcessTypeModule.GetElectronProcessType() == 'node');
  });

  it(`call in node process - 3`, function () {
    const electronProcessTypeModule = require('../lib/v2/');
    assert(electronProcessTypeModule.GetElectronProcessType() == 'node');
  });
});


