import * as daml from '@daml/types';
import * as Types from '..//Types';
import * as pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template from '@daml2ts/d14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662/lib/DA/Internal/Template';
export declare type InstrumentLifecycle_StockSplit = {
    instrumentId: Types.Id;
    ratio: daml.Numeric;
};
export declare const InstrumentLifecycle_StockSplit: daml.Serializable<InstrumentLifecycle_StockSplit>;
export declare type InstrumentLifecycle = {
    instrumentHost: daml.Party;
    positionHosts: daml.Party[];
};
export declare const InstrumentLifecycle: daml.Template<InstrumentLifecycle, InstrumentLifecycle.Key, '616828b22c8c054f0b0b0cf357ea20e3c5e6ab1ec4d6fe819a5362ec32d3518a:Lifecycle.EqStock:InstrumentLifecycle'> & {
    Archive: daml.Choice<InstrumentLifecycle, pkgd14e08374fc7197d6a0de468c968ae8ba3aadbf9315476fd39071831f5923662_DA_Internal_Template.Archive, {}, InstrumentLifecycle.Key>;
    InstrumentLifecycle_StockSplit: daml.Choice<InstrumentLifecycle, InstrumentLifecycle_StockSplit, {}, InstrumentLifecycle.Key>;
};
export declare namespace InstrumentLifecycle {
    type Key = daml.Party;
}
