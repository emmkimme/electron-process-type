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
function ConvertEC2String(ec) {
  let result = [];
  if (ec & eptModule.NodeEnv) {
    result.push('NodeEnv');
  }
  if (ec & eptModule.BrowserEnv) {
    result.push('BrowserEnv');
  }
  if (ec & eptModule.ElectronEnv) {
    result.push('ElectronEnv');
  }
  if (ec & eptModule.WorkerEnv) {
    result.push('WorkerEnv');
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

function GetExecutionContextTest(name, expectedResult) {

  describe(name, () => {
    it(`ExecutionContext`, function () {
      const eptModule = require('../lib');
      const result = eptModule.GetExecutionContext();
      console.info(`${Title(this)} = ${ConvertEC2String(result)}`);
      expect(result).to.equal(expectedResult);
    });
  });
}


exports.GetExecutionContextTest = GetExecutionContextTest;
exports.ConvertEC2String = ConvertEC2String;
