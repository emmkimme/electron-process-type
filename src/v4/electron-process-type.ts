import * as util from '../electron-process-type-util';

export type ElectronProcessType = 'electron-node' | 'electron-browser' | 'electron-main' | 'node' | 'browser';

export { IsProcessNode, IsProcessBrowser, IsProcessElectron } from '../electron-process-type-util';

export function GetElectronProcessType(): ElectronProcessType {
    const electronProcessType = util.GetElectronProcessType();
    switch (electronProcessType) {
        case util.ElectronProcessTypeFlags.ElectronMain:
            return 'electron-main';
        case util.ElectronProcessTypeFlags.Node:
            return 'node';
        case util.ElectronProcessTypeFlags.ElectronNode:
            return 'electron-node';
        case util.ElectronProcessTypeFlags.Browser:
            return 'browser';
        case util.ElectronProcessTypeFlags.ElectronBrowser:
            return 'electron-browser';
    }
}
