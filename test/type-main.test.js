const chai = require('chai');
const assert = chai.assert;

describe('GetElectronProcessType in main process', function () {

  it(`v1`, function () {
    const electronProcessTypeModule = require('../lib');
    assert(electronProcessTypeModule.GetElectronProcessType() == 'browser');
  });

  it(`v2 - 1`, function () {
    const electronProcessTypeModule = require('../lib');
    assert(electronProcessTypeModule.v2.GetElectronProcessType() == 'main');
  });
  it(`v2 - 2`, function () {
    const electronProcessTypeModule = require('../lib/v2');
    assert(electronProcessTypeModule.GetElectronProcessType() == 'main');
  });
  it(`v2 - 3`, function () {
    const electronProcessTypeModule = require('../lib/v2');
    assert(electronProcessTypeModule.GetElectronProcessType() == 'main');
  });

  it(`v3`, function () {
    const electronProcessTypeModule = require('../lib');
    assert(electronProcessTypeModule.v3.GetElectronProcessType() == 'main');

  });
});



