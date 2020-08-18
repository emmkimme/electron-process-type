// for backward compatibility
export { GetElectronProcessType } from './v1';
export { ElectronProcessType } from './v1';

import { GetElectronProcessType as GetElectronProcessTypeV1 } from './v1';
import { ElectronProcessType as ElectronProcessTypeV1 } from './v1';

import { GetElectronProcessType as GetElectronProcessTypeV2 } from './v2';
import { ElectronProcessType as ElectronProcessTypeV2 } from './v2';

import { GetElectronProcessType as GetElectronProcessTypeV3 } from './v3';
import { ElectronProcessType as ElectronProcessTypeV3 } from './v3';

import { GetElectronProcessType as GetElectronProcessTypeV4 } from './v4';
import { ElectronProcessType as ElectronProcessTypeV4 } from './v4';

export namespace v1 {
    export const GetElectronProcessType: () => ElectronProcessTypeV1 = GetElectronProcessTypeV1;
}

export namespace v2 {
    export const GetElectronProcessType: () => ElectronProcessTypeV2 = GetElectronProcessTypeV2;
}

export namespace v3 {
    export const GetElectronProcessType: () => ElectronProcessTypeV3 = GetElectronProcessTypeV3;
}

export namespace v4 {
    export const GetElectronProcessType: () => ElectronProcessTypeV4 = GetElectronProcessTypeV4;
}

export * from './electron-process-type-util';