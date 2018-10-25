const chai = require('chai');
const assert = chai.assert;

describe('GetElectronProcessType in renderer process', function () {

  it(`v1`, function () {
    const electronProcessTypeModule = require('../lib');
    assert(electronProcessTypeModule.GetElectronProcessType() == 'renderer');
  });

  it(`v2 - 1`, function () {
    const electronProcessTypeModule = require('../lib');
    assert(electronProcessTypeModule.v2.GetElectronProcessType() == 'renderer');
  });
  it(`v2 - 2`, function () {
    const electronProcessTypeModule = require('../lib/v2');
    assert(electronProcessTypeModule.GetElectronProcessType() == 'renderer');
  });
  it(`v2 - 3`, function () {
    const electronProcessTypeModule = require('../lib/v2');
    assert(electronProcessTypeModule.GetElectronProcessType() == 'renderer');
  });

  it(`v3`, function () {
    const electronProcessTypeModule = require('../lib');
    assert(electronProcessTypeModule.v3.GetElectronProcessType() == 'browser');

  });
});



