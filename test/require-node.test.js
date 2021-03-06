const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;

describe(`require('electron') in node process`, function () {
  it(`test 1`, function () {
    // electron is in node_modules as declared as a devDependencies, so it is found !!
    const electronProcessTypeModule = require('electron');
    assert(electronProcessTypeModule);
  });

  it(`test 2`, function () {
    // electron is in node_modules as declared as a devDependencies, so we call an interface
    const electronProcessTypeModule = require('electron');
    expect(electronProcessTypeModule.ipcRenderer == null);
    expect(electronProcessTypeModule.ipcMain == null);
  });
});



