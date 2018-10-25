const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;

describe(`require('electron') in renderer process`, function () {
  it(`test 1`, function () {
    const electronProcessTypeModule = require('electron');
    assert(electronProcessTypeModule);
  });

  it(`test 2`, function () {
    const electronProcessTypeModule = require('electron');
    expect(electronProcessTypeModule.ipcRenderer != null);
    expect(electronProcessTypeModule.ipcMain == null);
  });
});



