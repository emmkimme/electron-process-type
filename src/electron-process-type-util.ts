/// <reference types='electron'/>
// Needed for having process.type property

// Helpers
const isBrowser = (typeof window === 'object') && (typeof window.document === 'object');
const isWebWorker = (typeof self === 'object') && self.constructor && (self.constructor.name === 'DedicatedWorkerGlobalScope');

// Types of context
const ProcessContextUndefined = 0x00000000;
const ProcessContextNode      = 0x00000001;
const ProcessContextBrowser   = 0x00000010;
const ProcessContextWorker    = 0x00100000;

// Types of process
const ProcessElectron        = 0x00010000;
const ProcessElectronMain    = 0x00030000;

/** @internal */
export enum ElectronProcessType {
    Undefined         = ProcessContextUndefined,
    Node              = ProcessContextNode,
    Browser           = ProcessContextBrowser,
    Worker            = ProcessContextWorker,
    ElectronNode      = ProcessContextNode | ProcessElectron,
    ElectronBrowser   = ProcessContextBrowser | ProcessElectron,
    ElectronMainNode  = ProcessContextNode | ProcessElectronMain
}

export function IsContextNode(): boolean {
    const processContext = GetElectronProcessType();
    return (processContext & ProcessContextNode) === ProcessContextNode;
}

export function IsContextBrowser(): boolean {
    const processContext = GetElectronProcessType();
    return (processContext & ProcessContextBrowser) === ProcessContextBrowser;
}

export function IsContextWorker(): boolean {
    const processContext = GetElectronProcessType();
    return (processContext & ProcessContextWorker) === ProcessContextWorker;
}

export function IsProcessElectron(): boolean {
    const processContext = GetElectronProcessType();
    return (processContext & ProcessElectron) === ProcessElectron;
}

/** @internal */
export function GetElectronProcessType(): ElectronProcessType {
    // By default
    let processContext = ElectronProcessType.Undefined;
    // Use what it seems the most relevant method for detecting if we are in a browser
    if (isBrowser) {
        processContext = ElectronProcessType.Browser;
        // Try the official Electron method
        if ((typeof process ==='object') && (process.type === 'renderer')) {
            processContext = ElectronProcessType.ElectronBrowser;
        }
        // 'process.type' may be null
        // - in a renderer process with Chomium sandbox mode enabled (--enable-sandbox, webPreferences.sandbox = true)
        // - in a renderer process with nodeIntegration=false
        // - in a renderer process preload with sandbox=true
        else if ((typeof navigator === 'object') && (typeof navigator.appVersion === 'string') && (navigator.appVersion.indexOf(' Electron/') >= 0)) {
            processContext = ElectronProcessType.ElectronBrowser;
            try {
                // Would work in a preload
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
    else if (typeof process ==='object') {
        processContext = ElectronProcessType.Node;
        // Try the official Electron method
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
