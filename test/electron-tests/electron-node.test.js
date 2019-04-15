const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
// const mocha = require('mocha').interfaces;
// const mocha = require('mocha').interfaces;
// const bdd = mocha.bdd();
// const describe = bdd.context.describe;
// const it = bdd.context.it;

describe('GetElectronProcessType in Electron node process', function () {
  it(`v1`, function () {
    const electronProcessTypeModule = require('../../lib');
    expect(electronProcessTypeModule.GetElectronProcessType()).to.equal('node');
  });

  it(`v2 - 1`, function () {
    const electronProcessTypeModule = require('../../lib');
    expect(electronProcessTypeModule.v2.GetElectronProcessType()).to.equal('node');
  });
  it(`v2 - 2`, function () {
    const electronProcessTypeModule = require('../../lib/v2');
    expect(electronProcessTypeModule.GetElectronProcessType()).to.equal('node');
  });

  it(`v3`, function () {
    const electronProcessTypeModule = require('../../lib');
    expect(electronProcessTypeModule.v3.GetElectronProcessType()).to.equal('node');
  });

  it(`v4`, function () {
    const electronProcessTypeModule = require('../../lib');
    expect(electronProcessTypeModule.v4.GetElectronProcessType()).to.equal('electron-node');
  });
});



