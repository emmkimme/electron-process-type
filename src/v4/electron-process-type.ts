import * as util from '../electron-process-type-util';

export type ElectronProcessType = util.ElectronProcessType;

export function GetElectronProcessType(): ElectronProcessType {
    return util.GetElectronProcessType();
}
