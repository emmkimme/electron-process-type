(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function (process){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isBrowser = (typeof window === 'object') && (typeof window.document === 'object');
const isWebWorker = (typeof self === 'object') && self.constructor && (self.constructor.name === 'DedicatedWorkerGlobalScope');
const ProcessContextUndefined = 0x00000000;
const ProcessContextNode = 0x00000001;
const ProcessContextBrowser = 0x00000010;
const ProcessContextWorker = 0x00100000;
const ProcessElectron = 0x00010000;
const ProcessElectronMain = 0x00030000;
var ElectronProcessType;
(function (ElectronProcessType) {
    ElectronProcessType[ElectronProcessType["Undefined"] = ProcessContextUndefined] = "Undefined";
    ElectronProcessType[ElectronProcessType["Node"] = ProcessContextNode] = "Node";
    ElectronProcessType[ElectronProcessType["Browser"] = ProcessContextBrowser] = "Browser";
    ElectronProcessType[ElectronProcessType["Worker"] = ProcessContextWorker] = "Worker";
    ElectronProcessType[ElectronProcessType["ElectronNode"] = ProcessContextNode | ProcessElectron] = "ElectronNode";
    ElectronProcessType[ElectronProcessType["ElectronBrowser"] = ProcessContextBrowser | ProcessElectron] = "ElectronBrowser";
    ElectronProcessType[ElectronProcessType["ElectronMainNode"] = ProcessContextNode | ProcessElectronMain] = "ElectronMainNode";
})(ElectronProcessType = exports.ElectronProcessType || (exports.ElectronProcessType = {}));
function IsProcessNode() {
    const processContext = GetElectronProcessType();
    return processContext & ProcessContextNode;
}
exports.IsProcessNode = IsProcessNode;
function IsProcessBrowser() {
    const processContext = GetElectronProcessType();
    return processContext & ProcessContextBrowser;
}
exports.IsProcessBrowser = IsProcessBrowser;
function IsProcessWorker() {
    const processContext = GetElectronProcessType();
    return processContext & ProcessContextWorker;
}
exports.IsProcessWorker = IsProcessWorker;
function IsProcessElectron() {
    const processContext = GetElectronProcessType();
    return processContext & ProcessElectron;
}
exports.IsProcessElectron = IsProcessElectron;
function GetElectronProcessType() {
    let processContext = ElectronProcessType.Undefined;
    if (isBrowser) {
        processContext = ElectronProcessType.Browser;
        if ((typeof process === 'object') && (process.type === 'renderer')) {
            processContext = ElectronProcessType.ElectronBrowser;
        }
        else if ((typeof navigator === 'object') && (typeof navigator.appVersion === 'string') && (navigator.appVersion.indexOf(' Electron/') >= 0)) {
            processContext = ElectronProcessType.ElectronBrowser;
            try {
                const electron = require('electron');
                if (electron.ipcRenderer) {
                    processContext = ElectronProcessType.ElectronBrowser;
                }
            }
            catch (err) {
            }
        }
    }
    else if (isWebWorker) {
        processContext = ElectronProcessType.Worker;
    }
    else if (typeof process === 'object') {
        processContext = ElectronProcessType.Node;
        if (process.type === 'browser') {
            processContext = ElectronProcessType.ElectronMainNode;
        }
        else {
            if ((typeof process.versions === 'object') && (typeof process.versions.electron === 'string')) {
                processContext = ElectronProcessType.ElectronNode;
            }
            else {
                processContext = process.env['ELECTRON_RUN_AS_NODE'] ? ElectronProcessType.ElectronNode : ElectronProcessType.Node;
            }
        }
    }
    return processContext;
}
exports.GetElectronProcessType = GetElectronProcessType;

}).call(this,require('_process'))
},{"_process":10,"electron":"electron"}],2:[function(require,module,exports){
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./v1/electron-process-type"));

},{"./v1/electron-process-type":3}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util = require("../electron-process-type-util");
function GetElectronProcessType() {
    const electronProcessType = util.GetElectronProcessType();
    switch (electronProcessType) {
        case util.ElectronProcessType.ElectronMainNode:
            return 'browser';
        case util.ElectronProcessType.Node:
        case util.ElectronProcessType.ElectronNode:
            return 'node';
        case util.ElectronProcessType.Browser:
        case util.ElectronProcessType.ElectronBrowser:
            return 'renderer';
        case util.ElectronProcessType.Worker:
            return 'worker';
        case util.ElectronProcessType.Undefined:
        default:
            return 'undefined';
    }
}
exports.GetElectronProcessType = GetElectronProcessType;

},{"../electron-process-type-util":1}],4:[function(require,module,exports){
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./v2/electron-process-type"));

},{"./v2/electron-process-type":5}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util = require("../electron-process-type-util");
function GetElectronProcessType() {
    const electronProcessType = util.GetElectronProcessType();
    switch (electronProcessType) {
        case util.ElectronProcessType.ElectronMainNode:
            return 'main';
        case util.ElectronProcessType.Node:
        case util.ElectronProcessType.ElectronNode:
            return 'node';
        case util.ElectronProcessType.Browser:
        case util.ElectronProcessType.ElectronBrowser:
            return 'renderer';
        case util.ElectronProcessType.Worker:
            return 'worker';
        case util.ElectronProcessType.Undefined:
        default:
            return 'undefined';
    }
}
exports.GetElectronProcessType = GetElectronProcessType;

},{"../electron-process-type-util":1}],6:[function(require,module,exports){
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./v3/electron-process-type"));

},{"./v3/electron-process-type":7}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util = require("../electron-process-type-util");
function GetElectronProcessType() {
    const electronProcessType = util.GetElectronProcessType();
    switch (electronProcessType) {
        case util.ElectronProcessType.ElectronMainNode:
            return 'main';
        case util.ElectronProcessType.Node:
        case util.ElectronProcessType.ElectronNode:
            return 'node';
        case util.ElectronProcessType.Browser:
        case util.ElectronProcessType.ElectronBrowser:
            return 'browser';
        case util.ElectronProcessType.Worker:
            return 'worker';
        case util.ElectronProcessType.Undefined:
        default:
            return 'undefined';
    }
}
exports.GetElectronProcessType = GetElectronProcessType;

},{"../electron-process-type-util":1}],8:[function(require,module,exports){
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./v4/electron-process-type"));

},{"./v4/electron-process-type":9}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util = require("../electron-process-type-util");
var electron_process_type_util_1 = require("../electron-process-type-util");
exports.IsProcessNode = electron_process_type_util_1.IsProcessNode;
exports.IsProcessBrowser = electron_process_type_util_1.IsProcessBrowser;
exports.IsProcessElectron = electron_process_type_util_1.IsProcessElectron;
function GetElectronProcessType() {
    const electronProcessType = util.GetElectronProcessType();
    switch (electronProcessType) {
        case util.ElectronProcessType.ElectronMainNode:
            return 'electron-main-node';
        case util.ElectronProcessType.Node:
            return 'node';
        case util.ElectronProcessType.ElectronNode:
            return 'electron-node';
        case util.ElectronProcessType.Browser:
            return 'browser';
        case util.ElectronProcessType.ElectronBrowser:
            return 'electron-browser';
        case util.ElectronProcessType.Worker:
            return 'worker';
        case util.ElectronProcessType.Undefined:
        default:
            return 'undefined';
    }
}
exports.GetElectronProcessType = GetElectronProcessType;

},{"../electron-process-type-util":1}],10:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],11:[function(require,module,exports){
(function (process){

window.addEventListener('load', () => {
    let processType
    try {
        processType = process.type
    }
    catch (err) {
        processType = err
    }

    const electronProcessTypeModuleV1 = require('../../lib/v1');
    const electronProcessTypeV1 = electronProcessTypeModuleV1.GetElectronProcessType()
    
    const electronProcessTypeModuleV2= require('../../lib/v2');
    const electronProcessTypeV2 = electronProcessTypeModuleV2.GetElectronProcessType()
    
    const electronProcessTypeModuleV3 = require('../../lib/v3');
    const electronProcessTypeV3 = electronProcessTypeModuleV3.GetElectronProcessType()
    
    const electronProcessTypeModuleV4 = require('../../lib/v4');
    const electronProcessTypeV4 = electronProcessTypeModuleV4.GetElectronProcessType()
    
    document.open();
    document.write(`<h1>Test process!</h1>`);
    document.write(`<br>`);
    document.write(`process.type=${processType}`);
    document.write(`<br>`);
    document.write(`GetElectronProcessType(v1)=${electronProcessTypeV1}`);
    document.write(`<br>`);
    document.write(`GetElectronProcessType(v2)=${electronProcessTypeV2}`);
    document.write(`<br>`);
    document.write(`GetElectronProcessType(v3)=${electronProcessTypeV3}`);
    document.write(`<br>`);
    document.write(`GetElectronProcessType(v4)=${electronProcessTypeV4}`);
    document.write(`<br>`);
    document.close();
})

}).call(this,require('_process'))
},{"../../lib/v1":2,"../../lib/v2":4,"../../lib/v3":6,"../../lib/v4":8,"_process":10}]},{},[11]);
