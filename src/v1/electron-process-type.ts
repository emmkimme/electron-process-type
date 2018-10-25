import { GetElectronProcessType as GetElectronProcessTypeV2 } from '../v2/electron-process-type';

export type ElectronProcessType = 'node' | 'browser' | 'main';

export function GetElectronProcessType(): ElectronProcessType {
    let electronProcessTypeV2 = GetElectronProcessTypeV2();
    switch(electronProcessTypeV2) {
        case 'main':
            return 'browser';
        default :
            return electronProcessTypeV2 as ElectronProcessType;
    }
}
