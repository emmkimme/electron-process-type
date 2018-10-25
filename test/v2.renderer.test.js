const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;

describe('GetElectronProcessType V2', function () {

  it(`call in renderer process - 1`, function () {
    const electronProcessTypeModule = require('../lib');
    assert(electronProcessTypeModule.v2.GetElectronProcessType() == 'renderer');
  });
  it(`call in renderer process - 2`, function () {
    const electronProcessTypeModule = require('../lib/v2');
    assert(electronProcessTypeModule.GetElectronProcessType() == 'renderer');
  });

  it(`call in renderer process - 3`, function () {
    const electronProcessTypeModule = require('../lib/v2/');
    assert(electronProcessTypeModule.GetElectronProcessType() == 'renderer');
  });

});


