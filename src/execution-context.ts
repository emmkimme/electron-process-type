/// <reference types='electron'/>
// Needed for having process.type property

// Types of environment / api
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
    ElectronWorker    = WorkerEnv | ElectronRuntime,
    ElectronNode      = NodeEnv | ElectronRuntime,
    ElectronRenderer  = BrowserEnv | ElectronRuntime,
    ElectronPreload   = BrowserEnv | ElectronEnv | ElectronRuntime,
    ElectronMain      = NodeEnv | ElectronEnv | ElectronRuntime
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

export function GetExecutionContext(): ExecutionContext {
    // Helpers
    const isBrowser = (typeof window === 'object')
        && (typeof navigator === 'object')
        && (typeof document === 'object')

    const isWebWorker = (typeof self === 'object')
        && (typeof self.importScripts === 'function')
        && (self.constructor && (self.constructor.name === 'DedicatedWorkerGlobalScope') || (self.constructor.name === 'WorkerGlobalScope'));

    const isElectronInProcess = typeof process !== 'undefined'
        && typeof process.versions !== 'undefined'
        && typeof process.versions.electron !== 'undefined';

    const isElectronInUserAgent = (typeof navigator === 'object')
        && (typeof navigator.userAgent === 'string')
        && (navigator.userAgent.indexOf('Electron/') >= 0);

    const isNode = (typeof module !== 'undefined' && !!module.exports);

    // const isElectronNodeIntegrationWebWorker = isWebWorker && (isElectron && process.type === 'worker');

    // By default
    let contextExecutionType = ExecutionContext.Undefined;
    // Try the official Electron method
    if (isElectronInProcess && (process.type === 'worker')) {
        contextExecutionType = ExecutionContext.ElectronWorker;
    }
    else if (isWebWorker) {
        if ((globalThis.WorkerNavigator as any) != null) {
            contextExecutionType = ExecutionContext.WebWorker;
        }
        else {
            contextExecutionType = ExecutionContext.WorkerThread;
        }
    }
    else if (isBrowser) {
        // Try the official Electron method
        if ((isElectronInProcess && (process.type === 'renderer'))
            // 'process.type' may be null
            // - in a renderer process with Chomium sandbox mode enabled (--enable-sandbox, webPreferences.sandbox = true)
            // - in a renderer process with nodeIntegration=false
            // - in a renderer process preload with sandbox=true
            || isElectronInUserAgent) {
            contextExecutionType = ExecutionContext.ElectronRenderer;
            try {
                // Should work in a preload only
                const electron = require('electron');
                if (electron.ipcRenderer) {
                    contextExecutionType = ExecutionContext.ElectronPreload;
                }
            }
            catch (err) {
            }
        }
        else {
            contextExecutionType = ExecutionContext.Browser;
        }
    }
    else if (isNode) {
        // Try the official Electron method
        if (process.type === 'browser') {
            contextExecutionType = ExecutionContext.ElectronMain;
        }
        else {
            if (isElectronInProcess || (process.env['ELECTRON_RUN_AS_NODE'])) {
                contextExecutionType = ExecutionContext.ElectronNode;
            }
            else {
                contextExecutionType = ExecutionContext.Node;
            }
        }
    }
    return contextExecutionType;
}
