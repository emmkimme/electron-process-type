import * as util from '../electron-process-type-util';

export type ElectronProcessType = 'electron-node' | 'electron-browser' | 'electron-main-node' | 'node' | 'browser' | 'worker' | 'undefined';

export { IsContextNode as IsProcessNode, IsContextBrowser as IsProcessBrowser, IsProcessElectron } from '../electron-process-type-util';

export function GetElectronProcessType(): ElectronProcessType {
    const electronProcessType = util.GetElectronProcessType();
    switch (electronProcessType) {
        case util.ElectronProcessType.ElectronMainNode:
            return 'electron-main-node';
        case util.ElectronProcessType.Node:
            return 'node';
        case util.ElectronProcessType.ElectronNode:
            return 'electron-node';
        case util.ElectronProcessType.Browser:
            return 'browser';
        case util.ElectronProcessType.ElectronBrowser:
            return 'electron-browser';
        case util.ElectronProcessType.Worker:
            return 'worker';
        case util.ElectronProcessType.Undefined:
        default:
            return 'undefined';
    }
}
