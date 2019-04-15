const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;

describe('GetElectronProcessType in renderer process', function () {

  it(`v1`, function () {
    const electronProcessTypeModule = require('../lib');
    expect(electronProcessTypeModule.GetElectronProcessType()).to.equal('renderer');
  });

  it(`v2 - 1`, function () {
    const electronProcessTypeModule = require('../lib');
    expect(electronProcessTypeModule.v2.GetElectronProcessType()).to.equal('renderer');
  });
  it(`v2 - 2`, function () {
    const electronProcessTypeModule = require('../lib/v2');
    expect(electronProcessTypeModule.GetElectronProcessType()).to.equal('renderer');
  });

  it(`v3`, function () {
    const electronProcessTypeModule = require('../lib');
    expect(electronProcessTypeModule.v3.GetElectronProcessType()).to.equal('browser');
  });

  it(`v4`, function () {
    const electronProcessTypeModule = require('../lib');
    expect(electronProcessTypeModule.v4.GetElectronProcessType()).to.equal('browser');
  });
});



