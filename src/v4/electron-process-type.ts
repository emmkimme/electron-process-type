import * as util from '../electron-process-type-util';

export type ElectronProcessType = 'electron-node' | 'electron-browser' | 'electron-main-node' | 'node' | 'browser' | 'worker' | 'undefined';

export { IsContextNode as IsProcessNode, IsContextBrowser as IsProcessBrowser, IsProcessElectron } from '../electron-process-type-util';

export function GetElectronProcessType(): ElectronProcessType {
    const electronProcessType = util.GetElectronProcessType();
    switch (electronProcessType) {
        case util.ContextExecutionType.ElectronMainNode:
            return 'electron-main-node';
        case util.ContextExecutionType.Node:
            return 'node';
        case util.ContextExecutionType.ElectronNode:
            return 'electron-node';
        case util.ContextExecutionType.Browser:
            return 'browser';
        case util.ContextExecutionType.ElectronBrowser:
            return 'electron-browser';
        case util.ContextExecutionType.Worker:
            return 'worker';
        case util.ContextExecutionType.Undefined:
        default:
            return 'undefined';
    }
}
