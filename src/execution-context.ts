/// <reference types='electron'/>

// Needed for having process.type property

// Helpers
const isBrowser = (typeof window === 'object')
&& (typeof navigator === 'object')
&& (typeof document === 'object')

const isWebWorker = (typeof self === 'object')
&& (typeof self.importScripts === 'function')
&& (self.constructor && (self.constructor.name === 'DedicatedWorkerGlobalScope') || (self.constructor.name === 'WorkerGlobalScope'));

const ProcessContextUndefined = 0x00000000;

// Types of Api
export const NodeContext      = 0x00000001;
export const BrowserContext   = 0x00000010;
export const WorkerContext    = 0x00000100;
export const ElectronContext  = 0x00001000;

// Types of runtime
export const NodeRuntime     = 0x00010000;
export const BrowserRuntime  = 0x00100000;
export const ElectronRuntime = 0x01000000;

/** @internal */
export enum ExecutionContext {
    Undefined         = ProcessContextUndefined,
    Node              = NodeContext | NodeRuntime,
    Browser           = BrowserContext | BrowserRuntime,
    WebWorker         = WorkerContext | BrowserRuntime,
    WorkerThread      = WorkerContext | NodeRuntime,
    ElectronThread    = WorkerContext | ElectronRuntime,
    ElectronNode      = NodeContext | ElectronRuntime,
    ElectronBrowser   = BrowserContext | ElectronRuntime,
    ElectronMainNode  = NodeContext | ElectronContext | ElectronRuntime
}

export function IsContextNode(): boolean {
    const processContext = GetExecutionContext();
    return (processContext & NodeContext) === NodeContext;
}

export function IsContextBrowser(): boolean {
    const processContext = GetExecutionContext();
    return (processContext & BrowserContext) === BrowserContext;
}

export function IsContextWorker(): boolean {
    const processContext = GetExecutionContext();
    return (processContext & WorkerContext) === WorkerContext;
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
            contextExecutionType = WorkerContext | runtimeType;
        }
        else {
            contextExecutionType = BrowserContext | runtimeType;
        }
    }
    else if (typeof process ==='object') {
        // Try the official Electron method
        if (process.type === 'browser') {
            contextExecutionType = NodeContext | ElectronContext | ElectronRuntime;
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
                contextExecutionType = WorkerContext | runtimeType;
            }
            else {
                contextExecutionType = NodeContext | runtimeType;
            }
        }
    }
    return contextExecutionType;
}