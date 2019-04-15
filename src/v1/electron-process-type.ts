import * as util from '../electron-process-type-util';

export type ElectronProcessType = 'node' | 'browser' | 'renderer';

export function GetElectronProcessType(): ElectronProcessType {
    const electronProcessType = util.GetElectronProcessType();
    switch(electronProcessType) {
        case 'electron-main':
            return 'browser';
        case 'node':
        case 'electron-node':
            return 'node';
        case 'browser':
            return 'renderer';
    }
}
