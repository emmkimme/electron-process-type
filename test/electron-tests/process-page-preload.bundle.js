(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function (process){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isBrowser = (typeof window !== 'undefined') && (typeof window.document !== 'undefined');
var ElectronProcessTypeFlags;
(function (ElectronProcessTypeFlags) {
    ElectronProcessTypeFlags[ElectronProcessTypeFlags["Node"] = 0] = "Node";
    ElectronProcessTypeFlags[ElectronProcessTypeFlags["Browser"] = 1] = "Browser";
    ElectronProcessTypeFlags[ElectronProcessTypeFlags["Electron"] = 16] = "Electron";
    ElectronProcessTypeFlags[ElectronProcessTypeFlags["ElectronNode"] = 16] = "ElectronNode";
    ElectronProcessTypeFlags[ElectronProcessTypeFlags["ElectronBrowser"] = 17] = "ElectronBrowser";
    ElectronProcessTypeFlags[ElectronProcessTypeFlags["Main"] = 256] = "Main";
    ElectronProcessTypeFlags[ElectronProcessTypeFlags["ElectronMainNode"] = 272] = "ElectronMainNode";
})(ElectronProcessTypeFlags = exports.ElectronProcessTypeFlags || (exports.ElectronProcessTypeFlags = {}));
function IsProcessNode() {
    const electronProcessType = GetElectronProcessType();
    return electronProcessType & ElectronProcessTypeFlags.Node;
}
exports.IsProcessNode = IsProcessNode;
function IsProcessBrowser() {
    const electronProcessType = GetElectronProcessType();
    return electronProcessType & ElectronProcessTypeFlags.Browser;
}
exports.IsProcessBrowser = IsProcessBrowser;
function IsProcessElectron() {
    const electronProcessType = GetElectronProcessType();
    return electronProcessType & ElectronProcessTypeFlags.Electron;
}
exports.IsProcessElectron = IsProcessElectron;
function GetElectronProcessType() {
    let electronProcessType = ElectronProcessTypeFlags.Node;
    const processType = process.type;
    if (processType === 'browser') {
        electronProcessType = ElectronProcessTypeFlags.ElectronMainNode;
    }
    else if (processType === 'renderer') {
        electronProcessType = ElectronProcessTypeFlags.ElectronBrowser;
    }
    else {
        if (isBrowser) {
            electronProcessType = ElectronProcessTypeFlags.Browser;
            try {
                const electron = require('electron');
                if (electron.ipcRenderer) {
                    electronProcessType = ElectronProcessTypeFlags.ElectronBrowser;
                }
            }
            catch (err) {
            }
        }
        else {
            electronProcessType = process.env['ELECTRON_RUN_AS_NODE'] ? ElectronProcessTypeFlags.ElectronNode : ElectronProcessTypeFlags.Node;
        }
    }
    return electronProcessType;
}
exports.GetElectronProcessType = GetElectronProcessType;

}).call(this,require('_process'))
},{"_process":4,"electron":"electron"}],2:[function(require,module,exports){
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./v2/electron-process-type"));

},{"./v2/electron-process-type":3}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util = require("../electron-process-type-util");
function GetElectronProcessType() {
    const electronProcessType = util.GetElectronProcessType();
    switch (electronProcessType) {
        case util.ElectronProcessTypeFlags.ElectronMainNode:
            return 'main';
        case util.ElectronProcessTypeFlags.Node:
        case util.ElectronProcessTypeFlags.ElectronNode:
            return 'node';
        case util.ElectronProcessTypeFlags.Browser:
        case util.ElectronProcessTypeFlags.ElectronBrowser:
            return 'renderer';
    }
}
exports.GetElectronProcessType = GetElectronProcessType;

},{"../electron-process-type-util":1}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
(function (process){
let processType
try {
    processType = process.type
}
catch (err) {
    processType= err
}

const electronProcessTypeModule = require('../../lib/v2');
let electronProcessType=electronProcessTypeModule.GetElectronProcessType()

console.log(`process.type=${processType}`);
console.log(`GetElectronProcessType(v2)=${electronProcessType}`);

}).call(this,require('_process'))
},{"../../lib/v2":2,"_process":4}]},{},[5]);
