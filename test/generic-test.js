const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;

function Title(context) {
  let title = context.test.title;
  let root = context.test.parent;
  while (root) {
    const txt = root.title;
    if (txt) {
      title = `${txt} - ${title}`;
    }
    root = root.parent;
  }
  return title;
}

const eptModule = require('../lib');
function convertEC2String(ec) {
  let result = [];
  if (ec & eptModule.NodeContext) {
    result.push('NodeContext');
  }
  if (ec & eptModule.BrowserContext) {
    result.push('BrowserContext');
  }
  if (ec & eptModule.ElectronContext) {
    result.push('ElectronContext');
  }
  if (ec & eptModule.WorkerContext) {
    result.push('WorkerContext');
  }
  if (ec & eptModule.BrowserRuntime) {
    result.push('BrowserRuntime');
  }
  if (ec & eptModule.NodeRuntime) {
    result.push('NodeRuntime');
  }
  if (ec & eptModule.ElectronRuntime) {
    result.push('ElectronRuntime');
  }
  return result.join(',');
}

function genericTest(name, expectedResuls) {

  describe(name, () => {
    it(`v1`, function () {
      const electronProcessTypeModule = require('../lib');
      const result = electronProcessTypeModule.GetElectronProcessType();
      console.info(`${Title(this)} = ${result}`);
      expect(result).to.equal(expectedResuls[0]);
    });

    it(`v2 - 1`, function () {
      const electronProcessTypeModule = require('../lib');
      const result = electronProcessTypeModule.v2.GetElectronProcessType();
      console.info(`${Title(this)} = ${result}`);
      expect(result).to.equal(expectedResuls[1]);
    });
    it(`v2 - 2`, function () {
      const electronProcessTypeModule = require('../lib/v2');
      const result = electronProcessTypeModule.GetElectronProcessType();
      console.info(`${Title(this)} = ${result}`);
      expect(result).to.equal(expectedResuls[2]);
    });

    it(`v3`, function () {
      const electronProcessTypeModule = require('../lib');
      const result = electronProcessTypeModule.v3.GetElectronProcessType();
      console.info(`${Title(this)} = ${result}`);
      expect(result).to.equal(expectedResuls[3]);
    });

    it(`v4`, function () {
      const electronProcessTypeModule = require('../lib');
      const result = electronProcessTypeModule.v4.GetElectronProcessType();
      console.info(`${Title(this)} = ${result}`);
      expect(result).to.equal(expectedResuls[4]);
    });

    it(`ExecutionContext`, function () {
      const electronProcessTypeModule = require('../lib');
      const result = electronProcessTypeModule.GetExecutionContext();
      console.info(`${Title(this)} = ${convertEC2String(result)}`);
      // expect(electronProcessTypeModule.GetExecutionContext()).to.equal('node');
    });
  });
}


exports.genericTest = genericTest;

