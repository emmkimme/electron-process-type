/// <reference types='electron'/>
// Needed for having process.type property

// See https://github.com/flexdinesh/browser-or-node
const isBrowser = (typeof window !== 'undefined') && (typeof window.document !== 'undefined');
// const isNode =  (typeof process !== 'undefined') &&  (process.versions != null) && (process.versions.node != null);

export type ElectronProcessType = 'node' | 'renderer' | 'main';

export function GetElectronProcessType(): ElectronProcessType {
    // By default
    let electronProcessType: ElectronProcessType = 'node';
    
    // Try the official Electron method
    let processType = process.type;
    if (processType === 'browser'){
        electronProcessType = 'main';
    }
    else if (processType === 'renderer') {
        electronProcessType = 'renderer';
    }
    // 'process.type' may be null
    // - in a node process
    // - in a renderer process with Chomium sandbox mode enabled (--enable-sandbox)
    // - in a renderer process with nodeIntegration=false
    // - in a renderer process preload with sandbox=true
    else {
        // Do we have to check process.env['ELECTRON_RUN_AS_NODE'] ????
        // By default
        electronProcessType = isBrowser ? 'renderer' : 'node';

        // // In a node process, we have to be very careful when requesting the 'electron' module
        // let electron: any;
        // try {
        //     electron = require('electron');
        // }
        // catch (err) {
        //     electron = null;
        // }
        // // Electron module not available we are 
        // // - in a 'node' process
        // // - in a 'renderer' process without nodeIntegration
        // // - in a 'renderer' process in sandbox mode
        // if (electron) {
        //     // Ultimate fallback
        //     // In development environment, 'electron' can be found in node_modules because declared as a devDependencies 
        //     // So do not trust the require success
        //     try {
        //         // If we find ipcRenderer then we are in a renderer process
        //         if (electron.ipcRenderer) {
        //             electronProcessType = 'renderer';
        //         }
        //         // If we find ipcMain then we are in the master/browser/main process
        //         // Supposed to be managed at the beginning !!
        //         else if (electron.ipcMain) {
        //             electronProcessType = 'main';
        //         }
        //     }
        //     catch (err) {
        //     }
        // }
    }
    return electronProcessType;
}
