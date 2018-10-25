// See https://github.com/flexdinesh/browser-or-node
const isBrowser = (typeof window !== 'undefined') && (typeof window.document !== 'undefined');
// const isNode =  (typeof process !== 'undefined') &&  (process.versions != null) && (process.versions.node != null);

export type ElectronProcessType = 'node' | 'renderer' | 'main';

export function GetElectronProcessType(): ElectronProcessType {
    // In a node process, we have to be very careful when requesting the 'electron' module
    let electronModuleExist = require.resolve('electron');
    // A bit paranoid as previous require supposed to check existence of 'electron'
    let electron: any;
    if (electronModuleExist) {
        try {
            electron = require('electron');
        }
        catch (err) {
            electronModuleExist = null;
        }
    }
    // Electron module not available we are 
    // - in a 'node' process
    // - in a 'renderer' process without nodeIntegration
    // - in a 'renderer' process in sandbox mode    if (!electronModuleExist) {
    if (!electronModuleExist) {
        return isBrowser ? 'renderer' : 'node';
    }

    // We could be :
    // -- in the 'browser' process
    // -- in a 'renderer' process but in the preload file
    // -- in a 'renderer' process with nodeIntegration

    // By default
    let electronProcessType: ElectronProcessType = 'node';
    // Try the official Electron method
    let processType = process.type;
    // May be null in Electron sandbox mode
    if (processType) {
        switch(processType) {
            case 'browser': 
                electronProcessType = 'main';
                break;
            case 'renderer': 
                electronProcessType = 'renderer';
                break;
        }
    }
    else {
        // If we find ipcRenderer then we are in a renderer process
        if (electron.ipcRenderer) {
            electronProcessType = 'renderer';
        }
        // If we find ipcMain then we are in the master/browser process
        else if (electron.ipcMain) {
            electronProcessType = 'main';
        }
        else if (isBrowser) {
            electronProcessType = 'renderer';
        }
    }
    return electronProcessType;
}
