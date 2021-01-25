import * as util from '../electron-process-type-util';

export type ElectronProcessType = 'node' | 'renderer' | 'main' | 'worker' | 'undefined';

export function GetElectronProcessType(): ElectronProcessType {
    const electronProcessType = util.GetElectronProcessType();
    switch (electronProcessType) {
        case util.ContextExecutionType.ElectronMainNode:
            return 'main';
        case util.ContextExecutionType.Node:
        case util.ContextExecutionType.ElectronNode:
            return 'node';
        case util.ContextExecutionType.Browser:
        case util.ContextExecutionType.ElectronBrowser:
            return 'renderer';
        case util.ContextExecutionType.Worker:
            return 'worker';
        case util.ContextExecutionType.Undefined:
        default:
            return 'undefined';
    }
}