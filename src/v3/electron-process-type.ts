import * as util from '../electron-process-type-util';

export type ElectronProcessType = 'node' | 'browser' | 'main';

export function GetElectronProcessType(): ElectronProcessType {
    const electronProcessType = util.GetElectronProcessType();
    switch(electronProcessType) {
        case 'electron-main':
            return 'main';
        case 'node':
        case 'electron-node':
            return 'node';
        case 'browser':
            return 'browser';
    }
}
