import * as util from '../execution-context';

export type ElectronProcessType = 'node' | 'browser' | 'renderer' | 'worker' | 'undefined';

export function GetElectronProcessType(): ElectronProcessType {
    const electronProcessType = util.GetExecutionContext();
    switch (electronProcessType) {
        case util.ExecutionContext.ElectronMainNode:
            return 'browser';
        case util.ExecutionContext.Node:
        case util.ExecutionContext.ElectronNode:
            return 'node';
        case util.ExecutionContext.Browser:
        case util.ExecutionContext.ElectronBrowser:
            return 'renderer';
        case util.ExecutionContext.WebWorker:
        case util.ExecutionContext.WorkerThread:
                return 'worker';
        case util.ExecutionContext.Undefined:
        default:
            return 'undefined';
    }
}
