import * as daml from '@daml/types';
import * as Types from '..//Types';
import * as pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template from '@daml2ts/d14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662/lib/DA/Internal/Template';
export declare type EqACBRC = {
    instrumentId: Types.Id;
    ccy: Types.Id;
    notional: daml.Numeric;
    barrier: daml.Numeric;
    barrierIsHit: boolean;
    fixingDates: daml.Date[];
    fixingIdx: daml.Int;
    coupon: daml.Numeric;
    underlying: Types.Id;
    initialFixing: daml.Numeric;
    obs: daml.Party[];
};
export declare const EqACBRC: daml.Template<EqACBRC, EqACBRC.Key, '616828b22c8c054f0b0b0cf357ea20e3c5e6ab1ec4d6fe819a5362ec32d3518a:RefData.EqACBRC:EqACBRC'> & {
    Archive: daml.Choice<EqACBRC, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template.Archive, {}, EqACBRC.Key>;
};
export declare namespace EqACBRC {
    type Key = Types.Id;
}
