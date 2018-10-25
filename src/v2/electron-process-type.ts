/// <reference types='electron'/>
// Needed for having process.type property

// See https://github.com/flexdinesh/browser-or-node
const isBrowser = (typeof window !== 'undefined') && (typeof window.document !== 'undefined');
// const isNode =  (typeof process !== 'undefined') &&  (process.versions != null) && (process.versions.node != null);

export type ElectronProcessType = 'node' | 'renderer' | 'main';

export function GetElectronProcessType(): ElectronProcessType {
    // In a node process, we have to be very careful when requesting the 'electron' module
    let electronModuleExist = require.resolve('electron');

    // Electron module not available we are 
    // - in a 'node' process
    // - in a 'renderer' process without nodeIntegration
    // - in a 'renderer' process in sandbox mode
    if (!electronModuleExist) {
        return isBrowser ? 'renderer' : 'node';
    }

    // By default (process.env['ELECTRON_RUN_AS_NODE'] ?)
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
        // Ultimate fallback
        // In development environment, 'electron' can be found in node_modules because declared as a devDependencies 
        // So do not trust the require success
        try {
            let electron = require('electron');
            // If we find ipcRenderer then we are in a renderer process
            if (electron.ipcRenderer) {
                electronProcessType = 'renderer';
            }
            // If we find ipcMain then we are in the master/browser/main process
            else if (electron.ipcMain) {
                electronProcessType = 'main';
            }
            else if (isBrowser) {
                electronProcessType = 'renderer';
            }
        }
        catch (err) {
            if (isBrowser) {
                electronProcessType = 'renderer';
            }
        }
    }
    return electronProcessType;
}
