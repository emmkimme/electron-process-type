import * as util from '../execution-context';

export type ElectronProcessType = 'node' | 'browser' | 'main' | 'worker' | 'undefined';

export function GetElectronProcessType(): ElectronProcessType {
    const electronProcessType = util.GetExecutionContext();
    switch (electronProcessType) {
        case util.ExecutionContext.ElectronMainNode:
            return 'main';
        case util.ExecutionContext.Node:
        case util.ExecutionContext.ElectronNode:
            return 'node';
        case util.ExecutionContext.Browser:
        case util.ExecutionContext.ElectronBrowser:
            return 'browser';
        case util.ExecutionContext.WebWorker:
        case util.ExecutionContext.WorkerThread:
            return 'worker';
        case util.ExecutionContext.Undefined:
        default:
            return 'undefined';
    }
}
