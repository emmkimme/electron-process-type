const chai = require('chai');
const assert = chai.assert;

describe('GetElectronProcessType in node process', function () {

  it(`v1`, function () {
    const electronProcessTypeModule = require('../lib');
    assert(electronProcessTypeModule.GetElectronProcessType() == 'node');
  });

  it(`v2 - 1`, function () {
    const electronProcessTypeModule = require('../lib');
    assert(electronProcessTypeModule.v2.GetElectronProcessType() == 'node');
  });
  it(`v2 - 2`, function () {
    const electronProcessTypeModule = require('../lib/v2');
    assert(electronProcessTypeModule.GetElectronProcessType() == 'node');
  });
  it(`v2 - 3`, function () {
    const electronProcessTypeModule = require('../lib/v2');
    assert(electronProcessTypeModule.GetElectronProcessType() == 'node');
  });

  it(`v3`, function () {
    const electronProcessTypeModule = require('../lib');
    assert(electronProcessTypeModule.v3.GetElectronProcessType() == 'node');

  });
});



