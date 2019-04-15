import * as util from '../electron-process-type-util';

export type ElectronProcessType = 'node' | 'browser' | 'main';

export function GetElectronProcessType(): ElectronProcessType {
    const electronProcessType = util.GetElectronProcessType();
    switch (electronProcessType) {
        case util.ElectronProcessTypeFlags.ElectronMainNode:
            return 'main';
        case util.ElectronProcessTypeFlags.Node:
        case util.ElectronProcessTypeFlags.ElectronNode:
            return 'node';
        case util.ElectronProcessTypeFlags.Browser:
        case util.ElectronProcessTypeFlags.ElectronBrowser:
            return 'browser';
    }
}
