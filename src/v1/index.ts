/// <reference types='electron' />

// A static import of Electron crashes the Node process
// import { ipcRenderer } from 'electron';
// So we must use require (dynamic import)
let electron: any;
try {
    electron = require('electron');
}
catch (err) {
}

// See https://github.com/flexdinesh/browser-or-node
const isBrowser = (typeof window !== 'undefined') && (typeof window.document !== 'undefined');
// const isNode =  (typeof process !== 'undefined') &&  (process.versions != null) && (process.versions.node != null);

export type ElectronProcessType = 'node' | 'renderer' | 'browser';

export function GetElectronProcessType(): ElectronProcessType {
    // Electron module not available we are 
    // - in a 'node' process
    // - in a 'renderer' process without nodeIntegration
    // - in a 'renderer' process in sandbox mode
    if (electron == null) {
        return isBrowser ? 'renderer' : 'node';
    }

    // We could be :
    // -- in the 'browser' process
    // -- in a 'renderer' process but in the preload file
    // -- in a 'renderer' process with nodeIntegration

    // Try the official Electron method
    let processType: ElectronProcessType = process.type as ElectronProcessType;
    // May be null in Electron sandbox mode
    if (processType == null) {
        // By default
        processType = 'node';
        // If we find ipcRenderer then we are in a renderer process
        if (electron.ipcRenderer) {
            processType = 'renderer';
        }
        // If we find ipcMain then we are in the master/browser process
        else if (electron.ipcMain) {
            processType = 'browser';
        }
        else if (isBrowser) {
            processType = 'renderer';
        }
    }
    return processType;
}
