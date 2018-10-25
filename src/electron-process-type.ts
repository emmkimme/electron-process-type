// for backward compatibility
export { GetElectronProcessType } from './v1/electron-process-type';
export { ElectronProcessType } from './v1/electron-process-type';

import { GetElectronProcessType as GetElectronProcessTypeV1 } from './v1/electron-process-type';
import { ElectronProcessType as ElectronProcessTypeV1 } from './v1/electron-process-type';

import { GetElectronProcessType as GetElectronProcessTypeV2 } from './v2/electron-process-type';
import { ElectronProcessType as ElectronProcessTypeV2 } from './v2/electron-process-type';

import { GetElectronProcessType as GetElectronProcessTypeV3 } from './v3/electron-process-type';
import { ElectronProcessType as ElectronProcessTypeV3 } from './v3/electron-process-type';

export namespace v1 {
    export let GetElectronProcessType: () => ElectronProcessTypeV1 = GetElectronProcessTypeV1;
}

export namespace v2 {
    export let GetElectronProcessType: () => ElectronProcessTypeV2 = GetElectronProcessTypeV2;
}

export namespace v3 {
    export let GetElectronProcessType: () => ElectronProcessTypeV3 = GetElectronProcessTypeV3;
}