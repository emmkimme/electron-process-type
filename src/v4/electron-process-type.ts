import * as util from '../execution-context';

export type ElectronProcessType = 'electron-node' | 'electron-browser' | 'electron-main-node' | 'node' | 'browser' | 'worker' | 'undefined';

export { IsContextNode as IsProcessNode, IsContextBrowser as IsProcessBrowser, IsProcessElectron } from '../execution-context';

export function GetElectronProcessType(): ElectronProcessType {
    const electronProcessType = util.GetExecutionContext();
    switch (electronProcessType) {
        case util.ExecutionContext.ElectronMainNode:
            return 'electron-main-node';
        case util.ExecutionContext.Node:
            return 'node';
        case util.ExecutionContext.ElectronNode:
            return 'electron-node';
        case util.ExecutionContext.Browser:
            return 'browser';
        case util.ExecutionContext.ElectronBrowser:
            return 'electron-browser';
        case util.ExecutionContext.WebWorker:
        case util.ExecutionContext.WorkerThread:
            return 'worker';
        case util.ExecutionContext.Undefined:
        default:
            return 'undefined';
    }
}
