import * as util from '../electron-process-type-util';

export type ElectronProcessType = 'node' | 'browser' | 'main' | 'worker' | 'undefined';

export function GetElectronProcessType(): ElectronProcessType {
    const electronProcessType = util.GetElectronProcessType();
    switch (electronProcessType) {
        case util.ElectronProcessType.ElectronMainNode:
            return 'main';
        case util.ElectronProcessType.Node:
        case util.ElectronProcessType.ElectronNode:
            return 'node';
        case util.ElectronProcessType.Browser:
        case util.ElectronProcessType.ElectronBrowser:
            return 'browser';
        case util.ElectronProcessType.Worker:
            return 'worker';
        case util.ElectronProcessType.Undefined:
        default:
            return 'undefined';
    }
}
