(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.v4 = exports.v3 = exports.v2 = exports.v1 = exports.GetElectronProcessType = void 0;
var v1_1 = require("./v1");
Object.defineProperty(exports, "GetElectronProcessType", { enumerable: true, get: function () { return v1_1.GetElectronProcessType; } });
const v1_2 = require("./v1");
const v2_1 = require("./v2");
const v3_1 = require("./v3");
const v4_1 = require("./v4");
var v1;
(function (v1) {
    v1.GetElectronProcessType = v1_2.GetElectronProcessType;
})(v1 = exports.v1 || (exports.v1 = {}));
var v2;
(function (v2) {
    v2.GetElectronProcessType = v2_1.GetElectronProcessType;
})(v2 = exports.v2 || (exports.v2 = {}));
var v3;
(function (v3) {
    v3.GetElectronProcessType = v3_1.GetElectronProcessType;
})(v3 = exports.v3 || (exports.v3 = {}));
var v4;
(function (v4) {
    v4.GetElectronProcessType = v4_1.GetElectronProcessType;
})(v4 = exports.v4 || (exports.v4 = {}));
__exportStar(require("./execution-context"), exports);

},{"./execution-context":2,"./v1":4,"./v2":6,"./v3":8,"./v4":10}],2:[function(require,module,exports){
(function (process){(function (){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetExecutionContext = exports.IsProcessElectron = exports.IsContextWorker = exports.IsContextBrowser = exports.IsContextNode = exports.ExecutionContext = exports.ElectronRuntime = exports.BrowserRuntime = exports.NodeRuntime = exports.ElectronContext = exports.WorkerContext = exports.BrowserContext = exports.NodeContext = void 0;
const isBrowser = (typeof window === 'object')
    && (typeof navigator === 'object')
    && (typeof document === 'object');
const isWebWorker = (typeof self === 'object')
    && (typeof self.importScripts === 'function')
    && (self.constructor && (self.constructor.name === 'DedicatedWorkerGlobalScope') || (self.constructor.name === 'WorkerGlobalScope'));
const ProcessContextUndefined = 0x00000000;
exports.NodeContext = 0x00000001;
exports.BrowserContext = 0x00000010;
exports.WorkerContext = 0x00000100;
exports.ElectronContext = 0x00001000;
exports.NodeRuntime = 0x00010000;
exports.BrowserRuntime = 0x00100000;
exports.ElectronRuntime = 0x01000000;
var ExecutionContext;
(function (ExecutionContext) {
    ExecutionContext[ExecutionContext["Undefined"] = ProcessContextUndefined] = "Undefined";
    ExecutionContext[ExecutionContext["Node"] = exports.NodeContext | exports.NodeRuntime] = "Node";
    ExecutionContext[ExecutionContext["Browser"] = exports.BrowserContext | exports.BrowserRuntime] = "Browser";
    ExecutionContext[ExecutionContext["WebWorker"] = exports.WorkerContext | exports.BrowserRuntime] = "WebWorker";
    ExecutionContext[ExecutionContext["WorkerThread"] = exports.WorkerContext | exports.NodeRuntime] = "WorkerThread";
    ExecutionContext[ExecutionContext["ElectronThread"] = exports.WorkerContext | exports.ElectronRuntime] = "ElectronThread";
    ExecutionContext[ExecutionContext["ElectronNode"] = exports.NodeContext | exports.ElectronRuntime] = "ElectronNode";
    ExecutionContext[ExecutionContext["ElectronBrowser"] = exports.BrowserContext | exports.ElectronRuntime] = "ElectronBrowser";
    ExecutionContext[ExecutionContext["ElectronMainNode"] = exports.NodeContext | exports.ElectronContext | exports.ElectronRuntime] = "ElectronMainNode";
})(ExecutionContext = exports.ExecutionContext || (exports.ExecutionContext = {}));
function IsContextNode() {
    const processContext = GetExecutionContext();
    return (processContext & exports.NodeContext) === exports.NodeContext;
}
exports.IsContextNode = IsContextNode;
function IsContextBrowser() {
    const processContext = GetExecutionContext();
    return (processContext & exports.BrowserContext) === exports.BrowserContext;
}
exports.IsContextBrowser = IsContextBrowser;
function IsContextWorker() {
    const processContext = GetExecutionContext();
    return (processContext & exports.WorkerContext) === exports.WorkerContext;
}
exports.IsContextWorker = IsContextWorker;
function IsProcessElectron() {
    const processContext = GetExecutionContext();
    return (processContext & exports.ElectronRuntime) === exports.ElectronRuntime;
}
exports.IsProcessElectron = IsProcessElectron;
function GetExecutionContext() {
    let contextExecutionType = ExecutionContext.Undefined;
    if (isBrowser) {
        let runtimeType = exports.BrowserRuntime;
        if ((typeof process === 'object') && (process.type === 'renderer')) {
            runtimeType = exports.ElectronRuntime;
        }
        else if ((typeof navigator === 'object') && (typeof navigator.appVersion === 'string') && (navigator.appVersion.indexOf(' Electron/') >= 0)) {
            runtimeType = exports.ElectronRuntime;
        }
        else {
            try {
                const electron = require('electron');
                if (electron.ipcRenderer) {
                    runtimeType = exports.ElectronRuntime;
                }
            }
            catch (err) {
            }
        }
        if (isWebWorker) {
            contextExecutionType = exports.WorkerContext | runtimeType;
        }
        else {
            contextExecutionType = exports.BrowserContext | runtimeType;
        }
    }
    else if (typeof process === 'object') {
        if (process.type === 'browser') {
            contextExecutionType = exports.NodeContext | exports.ElectronContext | exports.ElectronRuntime;
        }
        else {
            let runtimeType = exports.NodeRuntime;
            if ((typeof process.versions === 'object') && (typeof process.versions.electron === 'string')) {
                runtimeType = exports.ElectronRuntime;
            }
            else if (process.env['ELECTRON_RUN_AS_NODE']) {
                runtimeType = exports.ElectronRuntime;
            }
            if (isWebWorker) {
                contextExecutionType = exports.WorkerContext | runtimeType;
            }
            else {
                contextExecutionType = exports.NodeContext | runtimeType;
            }
        }
    }
    return contextExecutionType;
}
exports.GetExecutionContext = GetExecutionContext;

}).call(this)}).call(this,require('_process'))
},{"_process":12,"electron":"electron"}],3:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./electron-process-type"), exports);
__exportStar(require("./execution-context"), exports);

},{"./electron-process-type":1,"./execution-context":2}],4:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./v1/electron-process-type"), exports);

},{"./v1/electron-process-type":5}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetElectronProcessType = void 0;
const util = require("../execution-context");
function GetElectronProcessType() {
    const electronProcessType = util.GetExecutionContext();
    switch (electronProcessType) {
        case util.ExecutionContext.ElectronMainNode:
            return 'browser';
        case util.ExecutionContext.Node:
        case util.ExecutionContext.ElectronNode:
            return 'node';
        case util.ExecutionContext.Browser:
        case util.ExecutionContext.ElectronBrowser:
            return 'renderer';
        case util.ExecutionContext.WebWorker:
        case util.ExecutionContext.WorkerThread:
            return 'worker';
        case util.ExecutionContext.Undefined:
        default:
            return 'undefined';
    }
}
exports.GetElectronProcessType = GetElectronProcessType;

},{"../execution-context":2}],6:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./v2/electron-process-type"), exports);

},{"./v2/electron-process-type":7}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetElectronProcessType = void 0;
const util = require("../execution-context");
function GetElectronProcessType() {
    const electronProcessType = util.GetExecutionContext();
    switch (electronProcessType) {
        case util.ExecutionContext.ElectronMainNode:
            return 'main';
        case util.ExecutionContext.Node:
        case util.ExecutionContext.ElectronNode:
            return 'node';
        case util.ExecutionContext.Browser:
        case util.ExecutionContext.ElectronBrowser:
            return 'renderer';
        case util.ExecutionContext.WebWorker:
        case util.ExecutionContext.WorkerThread:
            return 'worker';
        case util.ExecutionContext.Undefined:
        default:
            return 'undefined';
    }
}
exports.GetElectronProcessType = GetElectronProcessType;

},{"../execution-context":2}],8:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./v3/electron-process-type"), exports);

},{"./v3/electron-process-type":9}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetElectronProcessType = void 0;
const util = require("../execution-context");
function GetElectronProcessType() {
    const electronProcessType = util.GetExecutionContext();
    switch (electronProcessType) {
        case util.ExecutionContext.ElectronMainNode:
            return 'main';
        case util.ExecutionContext.Node:
        case util.ExecutionContext.ElectronNode:
            return 'node';
        case util.ExecutionContext.Browser:
        case util.ExecutionContext.ElectronBrowser:
            return 'browser';
        case util.ExecutionContext.WebWorker:
        case util.ExecutionContext.WorkerThread:
            return 'worker';
        case util.ExecutionContext.Undefined:
        default:
            return 'undefined';
    }
}
exports.GetElectronProcessType = GetElectronProcessType;

},{"../execution-context":2}],10:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./v4/electron-process-type"), exports);

},{"./v4/electron-process-type":11}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetElectronProcessType = exports.IsProcessElectron = exports.IsProcessBrowser = exports.IsProcessNode = void 0;
const util = require("../execution-context");
var execution_context_1 = require("../execution-context");
Object.defineProperty(exports, "IsProcessNode", { enumerable: true, get: function () { return execution_context_1.IsContextNode; } });
Object.defineProperty(exports, "IsProcessBrowser", { enumerable: true, get: function () { return execution_context_1.IsContextBrowser; } });
Object.defineProperty(exports, "IsProcessElectron", { enumerable: true, get: function () { return execution_context_1.IsProcessElectron; } });
function GetElectronProcessType() {
    const electronProcessType = util.GetExecutionContext();
    switch (electronProcessType) {
        case util.ExecutionContext.ElectronMainNode:
            return 'electron-main-node';
        case util.ExecutionContext.Node:
            return 'node';
        case util.ExecutionContext.ElectronNode:
            return 'electron-node';
        case util.ExecutionContext.Browser:
            return 'browser';
        case util.ExecutionContext.ElectronBrowser:
            return 'electron-browser';
        case util.ExecutionContext.WebWorker:
        case util.ExecutionContext.WorkerThread:
            return 'worker';
        case util.ExecutionContext.Undefined:
        default:
            return 'undefined';
    }
}
exports.GetElectronProcessType = GetElectronProcessType;

},{"../execution-context":2}],12:[function(require,module,exports){
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

},{}],13:[function(require,module,exports){
(function (process){(function (){
let processType
try {
    processType = process.type
}
catch (err) {
    processType = err
}

console.log(`process.type=${processType}`);

const electronProcessTypeModuleV1 = require('../../lib/v1');
const electronProcessTypeV1 = electronProcessTypeModuleV1.GetElectronProcessType()

const electronProcessTypeModuleV2= require('../../lib/v2');
const electronProcessTypeV2 = electronProcessTypeModuleV2.GetElectronProcessType()

const electronProcessTypeModuleV3 = require('../../lib/v3');
const electronProcessTypeV3 = electronProcessTypeModuleV3.GetElectronProcessType()

const electronProcessTypeModuleV4 = require('../../lib/v4');
const electronProcessTypeV4 = electronProcessTypeModuleV4.GetElectronProcessType()

const eptModule = require('../../lib');
const executionContext = eptModule.GetExecutionContext()

console.log(`GetElectronProcessType(v1)=${electronProcessTypeV1}`);
console.log(`GetElectronProcessType(v2)=${electronProcessTypeV2}`);
console.log(`GetElectronProcessType(v3)=${electronProcessTypeV3}`);
console.log(`GetElectronProcessType(v4)=${electronProcessTypeV4}`);
console.log(`GetExecutionContext=${executionContext}`);

}).call(this)}).call(this,require('_process'))
},{"../../lib":3,"../../lib/v1":4,"../../lib/v2":6,"../../lib/v3":8,"../../lib/v4":10,"_process":12}]},{},[13]);
