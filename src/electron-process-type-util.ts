/// <reference types='electron'/>
// Needed for having process.type property

// See https://github.com/flexdinesh/browser-or-node
const isBrowser = (typeof window !== 'undefined') && (typeof window.document !== 'undefined');
// const isNode =  (typeof process !== 'undefined') &&  (process.versions != null) && (process.versions.node != null);

/** @internal */
export enum ElectronProcessTypeFlags {
    Node = 0x0000,
    Browser = 0x0001,
    Electron = 0x0010,
    // Explicit set value else
    // Enum type 'ElectronProcessTypeFlags' has members with initializers that are not literals.ts(2535)
    ElectronNode = 0x0010, // Node | Electron,
    ElectronBrowser = 0x0011, // Browser | Electron,
    Main = 0x0100,
    ElectronMainNode = 0x0110, // Node | Electron | Main,
}

/** @internal */
export type ElectronProcessType =
    ElectronProcessTypeFlags.Node |
    ElectronProcessTypeFlags.Browser |
    ElectronProcessTypeFlags.ElectronBrowser |
    ElectronProcessTypeFlags.ElectronNode |
    ElectronProcessTypeFlags.ElectronMainNode;

/** @internal */
export function IsProcessNode() {
    const electronProcessType = GetElectronProcessType();
    return electronProcessType & ElectronProcessTypeFlags.Node;
}

/** @internal */
export function IsProcessBrowser() {
    const electronProcessType = GetElectronProcessType();
    return electronProcessType & ElectronProcessTypeFlags.Browser;
}

/** @internal */
export function IsProcessElectron() {
    const electronProcessType = GetElectronProcessType();
    return electronProcessType & ElectronProcessTypeFlags.Electron;
}

/** @internal */
export function GetElectronProcessType(): ElectronProcessType {
    // By default
    let electronProcessType: ElectronProcessType = ElectronProcessTypeFlags.Node;

    // Try the official Electron method
    const processType = process.type;
    if (processType === 'browser') {
        electronProcessType = ElectronProcessTypeFlags.ElectronMainNode;
    }
    else if (processType === 'renderer') {
        electronProcessType = ElectronProcessTypeFlags.ElectronBrowser;
    }
    // 'process.type' may be null
    // - in a node process
    // - in a renderer process with Chomium sandbox mode enabled (--enable-sandbox)
    // - in a renderer process with nodeIntegration=false
    // - in a renderer process preload with sandbox=true
    else {
        // By default
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
