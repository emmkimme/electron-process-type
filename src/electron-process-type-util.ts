/// <reference types='electron'/>
// Needed for having process.type property

// See https://github.com/flexdinesh/browser-or-node
const isBrowser = (typeof window !== 'undefined') && (typeof window.document !== 'undefined');
// const isNode =  (typeof process !== 'undefined') &&  (process.versions != null) && (process.versions.node != null);

/** @internal */
export type ElectronProcessType = 'electron-main' | 'electron-node' | 'browser' | 'node';

/** @internal */
export function GetElectronProcessType(): ElectronProcessType {
    // By default
    let electronProcessType: ElectronProcessType = 'node';
    
    // Try the official Electron method
    const processType = process.type;
    if (processType === 'browser'){
        electronProcessType = 'electron-main';
    }
    else if (processType === 'renderer') {
        electronProcessType = 'browser';
    }
    // 'process.type' may be null
    // - in a node process
    // - in a renderer process with Chomium sandbox mode enabled (--enable-sandbox)
    // - in a renderer process with nodeIntegration=false
    // - in a renderer process preload with sandbox=true
    else {
        // By default
        if (isBrowser) {
            electronProcessType = 'browser';
        }
        else {
            electronProcessType = process.env['ELECTRON_RUN_AS_NODE'] ? 'electron-node' : 'node';
        }
    }
    return electronProcessType;
}
