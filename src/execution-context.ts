/// <reference types='electron'/>

// Needed for having process.type property

// Helpers
const isBrowser = (typeof window === 'object')
&& (typeof navigator === 'object')
&& (typeof document === 'object')

const isWebWorker = (typeof self === 'object')
&& (typeof self.importScripts === 'function')
&& (self.constructor && (self.constructor.name === 'DedicatedWorkerGlobalScope') || (self.constructor.name === 'WorkerGlobalScope'));

// Types of environment
export const NodeEnv      = 0x00000001;
export const BrowserEnv   = 0x00000010;
export const WorkerEnv    = 0x00000100;
export const ElectronEnv  = 0x00001000;

// Types of runtime
export const NodeRuntime     = 0x00010000;
export const BrowserRuntime  = 0x00100000;
export const ElectronRuntime = 0x01000000;

export enum ExecutionContext {
    Undefined         = 0,
    Node              = NodeEnv | NodeRuntime,
    Browser           = BrowserEnv | BrowserRuntime,
    WebWorker         = WorkerEnv | BrowserRuntime,
    WorkerThread      = WorkerEnv | NodeRuntime,
    ElectronThread    = WorkerEnv | ElectronRuntime,
    ElectronNode      = NodeEnv | ElectronRuntime,
    ElectronBrowser   = BrowserEnv | ElectronRuntime,
    ElectronMainNode  = NodeEnv | ElectronEnv | ElectronRuntime
}

export function IsContextNode(): boolean {
    const processContext = GetExecutionContext();
    return (processContext & NodeEnv) === NodeEnv;
}

export function IsContextBrowser(): boolean {
    const processContext = GetExecutionContext();
    return (processContext & BrowserEnv) === BrowserEnv;
}

export function IsContextWorker(): boolean {
    const processContext = GetExecutionContext();
    return (processContext & WorkerEnv) === WorkerEnv;
}

export function IsProcessElectron(): boolean {
    const processContext = GetExecutionContext();
    return (processContext & ElectronRuntime) === ElectronRuntime;
}

/** @internal */
export function GetExecutionContext(): ExecutionContext {
    // By default
    let contextExecutionType = ExecutionContext.Undefined;
    // Use what it seems the most relevant method for detecting if we are in a browser
    if (isBrowser) {
        let runtimeType = BrowserRuntime;
        // Try the official Electron method
        if ((typeof process ==='object') && (process.type === 'renderer')) {
            runtimeType = ElectronRuntime;
        }
        // 'process.type' may be null
        // - in a renderer process with Chomium sandbox mode enabled (--enable-sandbox, webPreferences.sandbox = true)
        // - in a renderer process with nodeIntegration=false
        // - in a renderer process preload with sandbox=true
        else if ((typeof navigator === 'object') && (typeof navigator.appVersion === 'string') && (navigator.appVersion.indexOf(' Electron/') >= 0)) {
            runtimeType = ElectronRuntime;
        }
        else {
            try {
                // Would work in a preload
                const electron = require('electron');
                if (electron.ipcRenderer) {
                    runtimeType = ElectronRuntime;
                }
            }
            catch (err) {
            }
        }
        if (isWebWorker) {
            contextExecutionType = WorkerEnv | runtimeType;
        }
        else {
            contextExecutionType = BrowserEnv | runtimeType;
        }
    }
    else if (typeof process ==='object') {
        // Try the official Electron method
        if (process.type === 'browser') {
            contextExecutionType = NodeEnv | ElectronEnv | ElectronRuntime;
        }
        else {
            let runtimeType = NodeRuntime;
            if ((typeof process.versions === 'object') && (typeof process.versions.electron === 'string')) {
                runtimeType = ElectronRuntime;
            }
            else if (process.env['ELECTRON_RUN_AS_NODE']) {
                runtimeType = ElectronRuntime;
            }
            if (isWebWorker) {
                contextExecutionType = WorkerEnv | runtimeType;
            }
            else {
                contextExecutionType = NodeEnv | runtimeType;
            }
        }
    }
    return contextExecutionType;
}
